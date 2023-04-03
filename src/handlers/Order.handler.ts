import useAxios from '../hooks/useAxios.hook';
import {
  BU_PATH_ORDER,
  BU_PATH_ORDER_CARDS, BU_PATH_ORDER_PRINT,
  BU_PRELOAD_ORDER,
} from '../constants';
import { ExtractableString } from '../utils';

type OrderOwnerType = {
  id: number,
  name: string,
  cpf: string
}

type OrderCardOwnerType = {
  id: number,
  cpf: string,
  name: string
}

type OrderCardType = {
  number: string,
  value: number,
  owner: OrderCardOwnerType,
  createdAt: Date,
  charge: string
}

type OrderCardPageType = {
  cards: OrderCardType[],
  current: number,
  pages: number,
  total: number
}

export type OrderType = {
  id: number,
  number: number,
  status: number,
  owner: OrderOwnerType,
  values: {
    recarges: number,
    paid: number,
    taxes: number,
    total: number
  },
  createdAt: Date,
  paidAt: Date|null,
  rechargePeriod: {
    from: Date,
    to: Date
  }|null
  cards: OrderCardPageType
};

function Order(session: string, owner: number, number: number, status: number, page: number = 1): Promise<OrderType> {
  const query = new URLSearchParams({
    'PRV_ID': `${owner}`,
    'ROM_TRANID': `${number}`,
    'ROM_SEQNBR': `${status}`,
  });

  const pageQuery = new URLSearchParams({
    'page': `${page}`
  });

  return useAxios(session).get(BU_PRELOAD_ORDER)
    .then(() => Promise.all([
      useAxios(session).get(`${BU_PATH_ORDER}?${query}`),
      useAxios(session).get(`${BU_PATH_ORDER_CARDS}?${pageQuery}`),
      useAxios(session).get(`${BU_PATH_ORDER_PRINT}?${query}`)
    ]))
    .then(datas => {
      if(!datas[0].data.includes('textoTD'))
        return Promise.reject('Invalid order data.');
      if(!datas[1].data.includes('CabecalhoGrid'))
        return Promise.reject('Invalid cards data.');
      if(!datas[2].data.includes('ProviderData1_ControlData'))
        return Promise.reject('Invalid print data.');

      return {
        order: new ExtractableString(datas[0].data),
        cards: new ExtractableString(datas[1].data),
        print: new ExtractableString(datas[2].data)
      } as { order: ExtractableString, cards: ExtractableString, print: ExtractableString };
    })
    .then(data => {
      const order = data.order.part('textoTD').split('<td');
      const createdAt = order[4].part('>').part('>', '<').split('/');
      const paidAt = order[6].part('>').part('>', '<').split('/');
      const rechargebleAt = order[8].part('>').part('>', '<').split('/');
      const cardPages = data.cards.part('page_CallBack', ')', true).split(',');

      const orderData: OrderType = {
        id: parseInt(order[2].part('>').part('>', '<').toString()),
        number,
        status,
        owner: {
          id: owner,
          name: data.print.mpart('ProviderData1_lblDescValue', '<b>', '<').toName().toString(),
          cpf: data.print.mpart('ProviderData1_lblDocumentValue', '<b>', '<').toName().toString(),
        } as OrderOwnerType,
        values: {
          recarges: order[10].part('>').part('>', '<').toPrice(),
          paid: order[12].part('>').part('>', '<').toPrice(),
          taxes: order[16].part('>').part('>', '<').toPrice(),
          total: order[20].part('>').part('><b>', '<').toPrice(),
        },
        createdAt: new Date(Date.parse(
          // 2023-03-26T00:00:00.000-03:00
          `${createdAt[2].toString()}-${createdAt[1].toString()}-${createdAt[0].toString()}T00:00:00.000-03:00`
        )),
        paidAt: paidAt.length < 3 ? null : new Date(Date.parse(
          // 2023-03-26T00:00:00.000-03:00
          `${paidAt[2].toString()}-${paidAt[1].toString()}-${paidAt[0].toString()}T00:00:00.000-03:00`
        )),
        rechargePeriod: rechargebleAt.length < 5 ? null : {
          from: new Date(Date.parse(
            // 2023-03-26T00:00:00.000-03:00
            `${ rechargebleAt[2].part(null, ' ').toString() }-${ rechargebleAt[1].toString() }-${ rechargebleAt[0].toString() }T00:00:00.000-03:00`
          )),
          to: new Date(Date.parse(
            // 2023-03-26T00:00:00.000-03:00
            `${ rechargebleAt[4].toString() }-${ rechargebleAt[3].toString() }-${ rechargebleAt[2].part('a ').toString() }T00:00:00.000-03:00`
          )),
        },
        cards: {
          cards: data.cards.part(null, '</table>').split('GridLinha').splice(1).map(data => {
            const card = data.split('<td');
            const created = card[4].part('>', '<').split('/');

            return {
              number: card[3].part('>', '<').toString(),
              value: card[5].part('>', '<').toPrice(),
              owner: {
                name: card[1].part('>', '<').toName().toString(),
                cpf: card[2].part('>', '<').toString()
              },
              createdAt: new Date(Date.parse(
                // 2023-03-26T00:00:00.000-03:00
                `${created[2].toString()}-${created[1].toString()}-${created[0].toString()}T00:00:00.000-03:00`
              ))
          } as OrderCardType;
          }),
          current: parseInt(cardPages[cardPages.length - 3].part('\'', '\'').toString()),
          pages: parseInt(cardPages[cardPages.length - 2].part('\'', '\'').toString()),
          total: parseInt(cardPages[cardPages.length - 1].part('\'', '\'').toString())
        } as OrderCardPageType
      };

      data.print.part('rptItens__ctl0_thRechargeStatus')
        .split('<tr>').splice(1).forEach(print => {
        const cardPrint = print.replaceAll('&nbsp;' , '').split('<td');
        const number = cardPrint[4].part('>', '<').toString();

        orderData.cards.cards = orderData.cards.cards.map(card => {
          if(card.number !== number)
            return card;

          return {
            ...card,
            owner: {
              ...card.owner,
              id: parseInt(cardPrint[1].part('>', '<').toString())
            },
            charge: cardPrint[6].part('>', '<').toString()
          };
        })
      });

      return orderData;
    });
}

export default Order;
