import { BU_PATH_OWNERS, BU_PRELOAD_OWNERS } from '../constants';
import useAxios from '../hooks/useAxios.hook';

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

  return useAxios(session).get(BU_PRELOAD_OWNERS)
    .then(() => useAxios(session).get(`${BU_PATH_OWNERS}?${query}`))
    .then(data => data.data.includes('CabecalhoGrid'));
}

export default Owners;