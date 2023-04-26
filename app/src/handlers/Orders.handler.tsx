import useAxios from '../hooks/useAxios.hook';
import { BU_PATH_ORDERS, BU_PRELOAD_ORDERS } from '../constants';
import { ExtractableString } from '../utils/ExtractableString.util';
import { Page } from '../models/Page.model';
import { Order as OrderModel } from '../models/Order.model';
import { parsePage } from '../utils/parsePage.util';
import { parseOrderStatus } from '../utils/parseOrderStatus.util';

/** Return a Page object with the list of orders, the first item is the last created order
 *
 * The orders conteins basic information including id and owner id
 * @param session The key of a valid logged session
 * @param [page=1] Page where the order is on the Orders list
 */
function Orders(session: string, page: number = 1): Promise<Page<OrderModel>> {
  const query = new URLSearchParams({
    page: `${ page }`
  });

  return useAxios(session).get(BU_PRELOAD_ORDERS)
    .then(() => useAxios(session).get(`${ BU_PATH_ORDERS }?${ query }`))
    .then(data => data.data.includes('CabecalhoGrid') ? new ExtractableString(data.data) : Promise.reject())
    .then(data => parsePage<OrderModel>(
      data,
      data.part('<script').split('GridLinha').splice(1, 100).map(line => {
        const date = line.split('<td>')[1].part(null, '</td').split('/');

        return {
          id: parseInt(line.mpart('DetailOrder(', '>', '<').toString()),
          owner: parseInt(line.part('DetailOrder(', ',').toString()),
          number: parseInt(line.mpart('DetailOrder(', ',', ',').toString()),
          status: parseOrderStatus(line.mpart('DetailOrder(', ',').part(',', ')').toString()),
          value: line.split('<td>')[2].slice(3).part(null, '</td').toPrice(),
          createdAt: new Date(Date.parse(
            // 2023-03-26T00:00:00.000-03:00
            `${date[2].toString()}-${date[1].toString()}-${date[0].toString()}T00:00:00.000-03:00`
          ))
        } as OrderModel;
      })
    ));
}

export default Orders;