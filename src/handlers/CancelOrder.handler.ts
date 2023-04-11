import useAxios from '../hooks/useAxios.hook';
import { BU_BILLET_DELETE, BU_PRELOAD_BILLET_DELETE } from '../constants';
import { ExtractableString } from '../utils/ExtractableString.util';
import { Order as OrderModel } from '../models/Order.model';

/** Cancel Order Handler
 * Cancel an order
 * @param session The key of a valid logged session
 * @param order Order object, has to conteins order owner id, order number and order status.
 * @param [page=1] Page where the order is on the Orders list
 * @return If the order is cancelled or not
 */
function CancelOrder(session: string, order: OrderModel, page: number = 1): Promise<boolean> {
  const query = new URLSearchParams({
    page: `${page}`,
    exclude: '1',
    PRV_ID: `${order.owner}`,
    ROM_TRANID: `${order.number}`,
    ROM_SEQNBR: `${order.status}`
  });

  return useAxios(session).get(BU_PRELOAD_BILLET_DELETE)
    .then(() => useAxios(session).get(`${BU_BILLET_DELETE}?${query}`))
    .then(data => data.data.includes('CabecalhoGrid')
      ? new ExtractableString(data.data)
      : Promise.reject())
    .then(data => {
      const status = data.part(`DetailOrder(${order.owner},${order.number}`, '</tr>')
        .split('<td>')[4]
        .part(null, '<')
        .toString();

      return status === 'Excluído'
    })
}

export default CancelOrder;















