import useAxios from '../hooks/useAxios.hook';
import {
  BU_PATH_CARD,
  BU_PATH_CARD_ORDERS,
  BU_PRELOAD_CARD,
} from '../constants';
import { ExtractableString } from '../utils/ExtractableString.util';
import { parseCardNumber } from '../utils/parseCardNumber.util';
import { Card as CardModel, CardOrder } from '../models/Card.model';
import { parsePage } from '../utils/parsePage.util';
import { parseOrderStatus } from '../utils/parseOrderStatus.util';

/** Returns the card basic data and the orders history of the card
 * @param session The key of a valid logged session
 * @param number The card number, as printed on the physical card, like "99.99.99999999-9"
 * @param [page=1] Page of the orders history
 */
function Card(session: string, number: string, page: number = 1): Promise<CardModel> {
  const numbers = parseCardNumber(number);

  const query = new URLSearchParams({
    'ISS_ID': `${numbers[0]}`,
    'CD_ID': `${numbers[1]}`,
    'CRD_SNR': `${numbers[2]}`,
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
      return {
        number: data.card.mpart('lblCard', '><b>', '<').toString(),
        status: data.card.mpart('lblStatus', '><b>', '<').toString(),
        iss: numbers[0],
        id: numbers[1],
        snr: numbers[2],
        orders: parsePage<CardOrder>(
          data.orders,
          data.orders.part('<table', '</table>').split('GridLinha').splice(1).map(data => {
            const order = data.split('<td');

            return {
              id: parseInt(order[1].part('>', '<').toString()),
              credit: order[2].part('>', '<').toPrice(),
              status: parseOrderStatus(order[3].part('>', '<').toString()),
              charge: order[4].part('>', '<').toString()
            } as CardOrder;
          })
        ),
      } as CardModel;
    });
}

export default Card;
