import useAxios from '../hooks/useAxios.hook';
import { BU_BILLET_DELETE, BU_PRELOAD_BILLET_DELETE } from '../constants';
import { ExtractableString } from '../utils';

/** Create Order Handler
 * Creates a new order to recharge the given card with the given value
 * @param {string} session The key of a valid logged session
 * @param {number} owner Order owner id (account manager)
 * @param {number} number It's the unique incremental number per user account
 * @param {number} status Order status [1=New, 2=Canceled, 3=Done, 4=CanceledAfterDone]
 * @param {number} [page=1] Page where the order is on the Orders list
 * @return {boolean} If the order is cancelled or not
 */
function CancelOrder(session: string, owner: number, number: number, status: number, page: number = 1): Promise<boolean> {
  const query = new URLSearchParams({
    page: `${page}`,
    exclude: '1',
    PRV_ID: `${owner}`,
    ROM_TRANID: `${number}`,
    ROM_SEQNBR: `${status}`
  });

  return useAxios(session).get(BU_PRELOAD_BILLET_DELETE)
    .then(() => useAxios(session).get(`${BU_BILLET_DELETE}?${query}`))
    .then(data => data.data.includes('CabecalhoGrid')
      ? new ExtractableString(data.data)
      : Promise.reject())
    .then(data => {
      const status = data.part(`DetailOrder(${owner},${number}`, '</tr>')
        .split('<td>')[4]
        .part(null, '<')
        .toString();

      return status === 'Excluído'
    })
}

export default CancelOrder;















