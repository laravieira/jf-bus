import useAxios from '../hooks/useAxios.hook';
import {
  BU_HOST,
  BU_PATH_RECEIPT,
  BU_PRELOAD_RECEIPT,
} from '../constants';
import { ExtractableString } from '../utils';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { moveAsync } from 'expo-file-system';

function Receipt(session: string, owner: number, number: number, status: number): Promise<void> {
  const query = new URLSearchParams({
    'PRV_ID': `${owner}`,
    'ROM_TRANID': `${number}`,
    'ROM_SEQNBR': `${status}`
  });

  return useAxios(session).get(BU_PRELOAD_RECEIPT)
    .then(() => useAxios(session).get(`${BU_PATH_RECEIPT}?${query}`))
    .then(data => data.data.includes('lblIDReciboTitle') ? new ExtractableString(data.data) : Promise.reject())
    .then(data => {
      const name = parseInt(data.mpart('lblOrder', '><b>', '<').toString())

      let pdf = data
        .replaceAll('../', BU_HOST)
        .replaceAll('100%', '')
        .replaceAll('iso-8859-1', 'utf-8');

      while(pdf.includes('<script'))
        pdf = new ExtractableString(
          pdf.part(null, '<script').toString() + pdf.part('</script>').toString()
        );

      return {
        name,
        data: pdf.toString()
      };
    })
    .then(pdf => printToFileAsync({ html: pdf.data })
      .then(({ uri }) => ({
        name: pdf.name,
        uri
      })))
    .then(({ name, uri }) => moveAsync({
      from: uri,
      //  file:///data/user/0/me.laravieira.jfbus/cache/Print/15886b64-da30-4bc6-9b33-0cb7ff3f0c3e.pdf
      to: uri.replace(/\/[\w|-]*\.pdf/, `/BU - ${name}.pdf`)
    }).then(() => uri.replace(/\/[\w|-]*\.pdf/, `/BU - ${name}.pdf`)))
    .then(uri => shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' }));
}

export default Receipt;
