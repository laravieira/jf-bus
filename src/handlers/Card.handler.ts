import useAxios from '../hooks/useAxios.hook';
import {
  BU_PATH_CARD,
  BU_PATH_CARD_ORDERS,
  BU_PRELOAD_CARD,
} from '../constants';
import { ExtractableString } from '../utils';

type CardOrderType = {
  id: number,
  credit: number,
  status: string,
  charge: string
};

type CardOrderPageType = {
  orders: CardOrderType[],
  current: number,
  pages: number,
  total: number
};

type CardType = {
  number: string,
  status: string,
  iss: number,
  id: number,
  snr: number,
  orders: CardOrderPageType
};

function Card(session: string, number: string, page: number = 1): Promise<CardType> {
  const numbers = new ExtractableString(number).part(null, '-').split('.');

  const query = new URLSearchParams({
    'ISS_ID': numbers[0].toString(),
    'CD_ID': numbers[1].toString(),
    'CRD_SNR': numbers[2].toString(),
  });

  const pageQuery = new URLSearchParams({
    'page': `${page}`
  });

  return useAxios(session).get(BU_PRELOAD_CARD)
    .then(() => Promise.all([
      useAxios(session).get(`${BU_PATH_CARD}?${query}`),
      useAxios(session).get(`${BU_PATH_CARD_ORDERS}?${pageQuery}`)
    ]))
    .then(datas => {
      if(!datas[0].data.includes('lblCard'))
        return Promise.reject('Invalid card data.');
      if(!datas[1].data.includes('CabecalhoGrid'))
        return Promise.reject('Invalid orders data.');

      return {
        card: new ExtractableString(datas[0].data),
        orders: new ExtractableString(datas[1].data)
      } as { card: ExtractableString, orders: ExtractableString };
    })
    .then(data => {
      const pages = data.orders.part('page_CallBack', ')').split(',');

      return {
      number: data.card.mpart('lblCard', '><b>', '<').toString(),
      status: data.card.mpart('lblStatus', '><b>', '<').toString(),
      iss: parseInt(numbers[0].toString()),
      id: parseInt(numbers[1].toString()),
      snr: parseInt(numbers[2].toString()),
      orders: {
        orders: data.orders.part('<table', '</table>').split('GridLinha').splice(1).map(data => {
          const order = data.split('<td');

          return {
            id: parseInt(order[1].part('>', '<').toString()),
            credit: order[2].part('>', '<').toPrice(),
            status: order[3].part('>', '<').toString(),
            charge: order[4].part('>', '<').toString()
          } as CardOrderType;
        }),
        current: parseInt(pages[pages.length-3].part('\'', '\'').toString()),
        pages: parseInt(pages[pages.length-2].part('\'', '\'').toString()),
        total: parseInt(pages[pages.length-1].part('\'', '\'').toString())
      } as CardOrderPageType
    } as CardType;
    });
}

export default Card;
