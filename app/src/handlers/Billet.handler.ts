import { BU_COOKIE_SESSION, BU_HOST, BU_PATH_BILLET } from '../constants';
import { shareAsync } from 'expo-sharing';
import {
  cacheDirectory,
  deleteAsync,
  downloadAsync,
  FileSystemDownloadResult,
  readAsStringAsync
} from 'expo-file-system';
import { Order as OrderModel } from '../models/Order.model';

const BU_CACHE_PATH_BILLET = `${cacheDirectory}BU - Billet.pdf`;

function downloadPDF(session: string, order: OrderModel): Promise<FileSystemDownloadResult> {
  const query = new URLSearchParams({
    'ProviderID': `${typeof order.owner === 'number' ? order.owner : order.owner.id}`,
    'TransactionID': `${order.number}`,
    'SequenceID': `${order.status}`
  });

  return deleteAsync(BU_CACHE_PATH_BILLET, { idempotent: true })
    // writeAsStringAsync() has a bug that makes it impossible to save .pdf to a file
    // so useAxios().get() gets the pdf content, but then I'm unable to save it.
    // The problem is with EncodingType.UTF-8, but I was also unable to convert the .pdf
    // content to EncodingType.Base64 (the only other supported) without breaking the .pdf.
    // downloadAsync() is less controllable and not the pattern used here, but it does the job.
    .then(() => downloadAsync(
      `${BU_HOST}${BU_PATH_BILLET}?${query}`,
      BU_CACHE_PATH_BILLET,
      { headers: { Cookie: `${BU_COOKIE_SESSION}=${session}` } }
    ))
}

/** Download a Billet of an order and call the phone share feature
 * @param session The key of a valid logged session
 * @param order Order object, has to conteins order owner id, order number and order status.
 */
function requestFile(session: string, order: OrderModel) {
  return downloadPDF(session, order)
    // Call sharing pop-up to share the pdf
    .then(({ uri }) => shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
      .then(() => uri))

    // Delete cache
    .then(uri => deleteAsync(uri, { idempotent: true }));
}

function requestCode(session: string, order: OrderModel) {
  //TODO Find a way to extract the billet code
  return downloadPDF(session, order)
    .then(({ uri }) => readAsStringAsync(uri))
    // Delete cache
    // .then(({uri}) => deleteAsync(uri, { idempotent: true }));
}

const Billet = {
  requestFile,
  requestCode
};

export default Billet;
