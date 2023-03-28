import useAxios from '../hooks/useAxios.hook';
import { BU_PATH_ORDERS, BU_PRELOAD_ORDERS } from '../constants';
import { ExtractableString } from '../utils';

export type Order = {
  id: number,
  number: number,
  status: number,
  owner: number,
  date: Date,
  price: number
};

export type OrdersPage = {
  orders: Order[],
  current: number,
  pages: number,
  total: number
}

function Orders(session: string, page?: number): Promise<OrdersPage> {
  const query = new URLSearchParams({
    page: `${ page ?? 1 }`
  });

  return useAxios(session).get(BU_PRELOAD_ORDERS)
    .then(() => useAxios(session).get(`${ BU_PATH_ORDERS }?${ query }`))
    .then(data => data.data.includes('CabecalhoGrid') ? new ExtractableString(data.data) : Promise.reject())
    .then(data => {
      const pages = data.part('page_CallBack', '</script>').split(',');
      const orders = data.part('<script').split('GridLinha').splice(1, 100).map(line => {
        const date = line.split('<td>')[1].part(null, '</td').split('/');

        return {
          id: parseInt(line.mpart('DetailOrder(', '>', '<').toString()),
          number: parseInt(line.mpart('DetailOrder(', ',', ',').toString()),
          status: parseInt(line.mpart('DetailOrder(', ',').part(',', ')').toString()),
          owner: parseInt(line.part('DetailOrder(', ',').toString()),
          price: line.split('<td>')[2].slice(3).part(null, '</td').toPrice(),
          date: new Date(Date.parse(
            // 2023-03-26T00:00:00.000-03:00
            `${date[2].toString()}-${date[1].toString()}-${date[0].toString()}T00:00:00.000-03:00`
          ))
        } as Order;
      });

      return {
        orders,
        current: parseInt(pages[pages.length - 3].part('\'', '\'').toString()),
        pages: parseInt(pages[pages.length - 2].part('\'', '\'').toString()),
        total: parseInt(pages[pages.length - 1].part('\'', '\'').toString())
      } as OrdersPage;
    });
}

export default Orders;