import { BU_HOST, BU_PATH_OWNERS, BU_PRELOAD_OWNERS } from '../constants';
import axios from 'axios';

function Owners(session: string): Promise<any> {
  const query = new URLSearchParams({
    page: '1',
    type: '1',
    field: '',
    group: '',
    groupdesc: '',
    status: 'A',
    order: '0'
  });

  return axios.get(`${BU_HOST}${BU_PRELOAD_OWNERS}`, { headers: {
    'Cookie': `ASP.NET_SessionId=${session}`
    } })
    .then(() => axios.get(`${BU_HOST}${BU_PATH_OWNERS}?${query}`, { headers: {
        'Cookie': `ASP.NET_SessionId=${session}`
      } }))
    .then(data => data.data.includes('CabecalhoGrid'));
}

export default Owners;