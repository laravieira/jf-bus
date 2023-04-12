import useAxios from '../hooks/useAxios.hook';
import {
  BU_PATH_ORDER,
  BU_PATH_ORDER_CARDS, BU_PATH_ORDER_PRINT,
  BU_PRELOAD_ORDER,
} from '../constants';
import { ExtractableString } from '../utils/ExtractableString.util';
import { Order as OrderModel, OrderOwner } from '../models/Order.model';
import { parsePage } from '../utils/parsePage.util';
import { Card, CardOrder } from '../models/Card.model';
import { parseCardNumber } from '../utils/parseCardNumber.util';
import { Page } from '../models/Page.model';
import { parseCardDesign } from '../utils/parseCardDesign.util';

/** Return the orders details containing the details values and list of card affected by this order
 *
 * The cards will have defined:
 * - An order history with one item inside representing details of the current order
 * - The createdAt defined
 * @param session The key of a valid logged session
 * @param order Order object, has to conteins order owner id, order number and order status.
 * @param [page=1] Page where the order is on the Orders list
 */
function Order(session: string, order: OrderModel, page: number = 1): Promise<OrderModel> {
  const query = new URLSearchParams({
    'PRV_ID': `${typeof order.owner === 'number' ? order.owner : order.owner.id}`,
    'ROM_TRANID': `${order.number}`,
    'ROM_SEQNBR': `${order.status}`,
  });

  const pageQuery = new URLSearchParams({
    'page': `${page}`
  });

  return useAxios(session).get(BU_PRELOAD_ORDER)
    .then(async () => {
      const order = await useAxios(session).get(`${BU_PATH_ORDER}?${query}`);
      if(!order.data.includes('textoTD'))
        return Promise.reject('Invalid order data.');

      const cards = await useAxios(session).get(`${BU_PATH_ORDER_CARDS}?${pageQuery}`);
      if(!cards.data.includes('CabecalhoGrid'))
        return Promise.reject('Invalid cards data.');

      const print = await useAxios(session).get(`${BU_PATH_ORDER_PRINT}?${query}`);
      if(!print.data.includes('ProviderData1_ControlData'))
        return Promise.reject('Invalid print data.');

      return {
        order: new ExtractableString(order.data),
        cards: new ExtractableString(cards.data),
        print: new ExtractableString(print.data)
      } as { order: ExtractableString, cards: ExtractableString, print: ExtractableString };
    })
    .then(data => {
      const _order = data.order.part('textoTD').split('<td');
      const createdAt = _order[4].part('>').part('>', '<').split('/');
      const paidAt = _order[6].part('>').part('>', '<').split('/');
      const rechargebleAt = _order[8].part('>').part('>', '<').split('/');
      const id = parseInt(_order[2].part('>').part('>', '<').toString());

      const orderData: OrderModel = {
        id,
        number: order.number,
        status: order.status,
        owner: {
          id: order.owner,
          name: data.print.mpart('ProviderData1_lblDescValue', '<b>', '<').toName().toString(),
          cpf: data.print.mpart('ProviderData1_lblDocumentValue', '<b>', '<').toName().toString(),
        } as OrderOwner,
        value: _order[20].part('>').part('><b>', '<').toPrice(),
        values: {
          recarges: _order[10].part('>').part('>', '<').toPrice(),
          paid: _order[12].part('>').part('>', '<').toPrice(),
          taxes: _order[16].part('>').part('>', '<').toPrice(),
          total: _order[20].part('>').part('><b>', '<').toPrice(),
        },
        createdAt: new Date(Date.parse(
          // 2023-03-26T00:00:00.000-03:00
          `${createdAt[2].toString()}-${createdAt[1].toString()}-${createdAt[0].toString()}T00:00:00.000-03:00`
        )),
        paidAt: paidAt.length < 3 ? undefined : new Date(Date.parse(
          // 2023-03-26T00:00:00.000-03:00
          `${paidAt[2].toString()}-${paidAt[1].toString()}-${paidAt[0].toString()}T00:00:00.000-03:00`
        )),
        rechargePeriod: rechargebleAt.length < 5 ? undefined : {
          from: new Date(Date.parse(
            // 2023-03-26T00:00:00.000-03:00
            `${ rechargebleAt[2].part(null, ' ').toString() }-${ rechargebleAt[1].toString() }-${ rechargebleAt[0].toString() }T00:00:00.000-03:00`
          )),
          to: new Date(Date.parse(
            // 2023-03-26T00:00:00.000-03:00
            `${ rechargebleAt[4].toString() }-${ rechargebleAt[3].toString() }-${ rechargebleAt[2].part('a ').toString() }T00:00:00.000-03:00`
          )),
        },
        cards: parsePage<Card>(
          data.cards,
          data.cards.part(null, '</table>').split('GridLinha').splice(1).map(data => {
            const card = data.split('<td');
            const created = card[4].part('>', '<').split('/');
            const number = card[3].part('>', '<').toString();
            const cardIds = parseCardNumber(number);

            return {
              number: number,
              iss: cardIds[0],
              design: parseCardDesign(cardIds[1]),
              snr: cardIds[2],
              name: card[1].part('>', '<').toName().toString(),
              owner: 0, // Will be defined on next step
              createdAt: new Date(Date.parse(
                // 2023-03-26T00:00:00.000-03:00
                `${created[2].toString()}-${created[1].toString()}-${created[0].toString()}T00:00:00.000-03:00`
              )),
              orders: {
                items: [{
                  id,
                  status: order.status,
                  credit: card[5].part('>', '<').toPrice(),
                  charge: '' // Will be defined on next step
                } as CardOrder],
                current: 1,
                pages: 1,
                total: 1
              } as Page<CardOrder>
            } as Card;
          })
        )
      };

      data.print.part('rptItens__ctl0_thRechargeStatus')
        .split('<tr>').splice(1).forEach(print => {
        const cardPrint = print.replaceAll('&nbsp;' , '').split('<td');
        const number = cardPrint[4].part('>', '<').toString();

        if(orderData.cards)
          orderData.cards.items = orderData.cards.items.map(card => {
            if(card.number !== number || !card.orders)
              return card;

            return {
              ...card,
              owner: parseInt(cardPrint[1].part('>', '<').toString()),
              orders: {
                ...card.orders,
                items: [{
                  ...card.orders.items[0],
                  charge: cardPrint[6].part('>', '<').toString()
                }]
              },
            };
          })
      });

      return orderData;
    });
}

export default Order;
