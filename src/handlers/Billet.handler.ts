import useAxios from '../hooks/useAxios.hook';
import { BU_COOKIE_SESSION, BU_HOST, BU_PATH_BILLET, BU_PRELOAD_BILLET, } from '../constants';
import { shareAsync } from 'expo-sharing';
import {
  cacheDirectory,
  deleteAsync,
  downloadAsync,
  FileSystemDownloadResult,
  readAsStringAsync
} from 'expo-file-system';

const BU_CACHE_PATH_BILLET = `${cacheDirectory}BU - Billet.pdf`;

function downloadPDF(session: string, owner: number, number: number, status: number): Promise<FileSystemDownloadResult> {
  const query = new URLSearchParams({
    'ProviderID': `${owner}`,
    'TransactionID': `${number}`,
    'SequenceID': `${status}`
  });

  return useAxios(session).get(BU_PRELOAD_BILLET)
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

function requestFile(session: string, owner: number, number: number, status: number) {
  return downloadPDF(session, owner, number, status)
    // Call sharing pop-up to share the pdf
    .then(({ uri }) => shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
      .then(() => uri))

    // Delete cache
    .then(uri => deleteAsync(uri, { idempotent: true }));
}

function requestCode(session: string, owner: number, number: number, status: number) {
  //TODO Find a way to extract the billet code
  return downloadPDF(session, owner, number, status)
    .then(({ uri }) => readAsStringAsync(uri))
    // Delete cache
    // .then(({uri}) => deleteAsync(uri, { idempotent: true }));
}

const Billet = {
  requestFile,
  requestCode
};

export default Billet;
