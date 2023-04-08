import useAxios from '../hooks/useAxios.hook';
import {
  BU_BILLET_CREATE, BU_BILLET_CREATE_CONFIRM,
  BU_BILLET_CREATE_LIST, BU_BILLET_CREATE_MODE,
  BU_BILLET_CREATE_VALUE, BU_PRELOAD_BILLET_CREATE
} from '../constants';

import { ExtractableString, parseCardNumber, parsePage } from '../utils';
import { Card } from '../models/Card.model';
import { Page } from '../models/Page.model';
import { CreatedOrder } from '../models/CreatedOrder.model';

function getAvailableCards(session: string, order: number, page: number): Promise<Page<Card>> {
  const query = new URLSearchParams({
    page: `${ page }`,
    filter: `|||GRUPO_REFINO=||ORDER=${ order }`
  });

  return useAxios(session).get(`${ BU_BILLET_CREATE_LIST }?${ query }`)
    .then(data => data.data.includes('CabecalhoGrid')
      ? new ExtractableString(data.data)
      : Promise.reject('Unable to get list of available users.'))
    .then(data => parsePage<Card>(
      data,
      data.split('GridLinha').splice(1).map(line => {
        const data = line.mpart('FormataValor', 'ChangeValue(', '"').split('µ');
        const number = parseCardNumber(data[13]);
        // ChangeValue(µ1µ© µ472192µ© µ513359µ© µ22954µ© document.getElementById(µtext_513359µ).value© µDOUGLAS VIEIRA DE MENEZESµ© µ59.20.00021735-2µ© µ1µ©µlinha513359µ)
        return {
          number: data[13].toString(),         // CARDCODE
          name: data[11].toString(),           // USERNAME
          owner: parseInt(data[5].toString()), // RIID
          iss: parseInt(number[0].toString()),
          id: parseInt(number[1].toString()),
          snr: parseInt(number[2].toString()),
          billet: {
            user: parseInt(data[7].toString()), // PRVID
            key: parseInt(data[3].toString()),  // USRID
            id: parseInt(data[15].toString()),  // RDT_ID
            line: data[17].toString()           // ID
          }
        } as Card;
      }),
      '"'
    ));
}

async function getCardToRecharge(session: string, card: Card, order: number): Promise<Card> {
  let data: Card|null = null;
  let page: Page<Card> = {
    items: [],
    current: 0,
    pages: 1,
    total: 1
  };

  while(page.current < page.pages && !data) {
    page = await getAvailableCards(session, order, page.current+1);
    for(const item of page.items)
      if(item.number === card.number)
        data = item;
  }

  if(data)
    return data;
  return Promise.reject('Card not available to recharge.');
}

/** Create Billet Handler
 * Creates a new billet to recharge the given card with the given value
 * @param {string} session The key of a valid logged session
 * @param {Card} card The card to be recharged (design data is required to be defined)
 * @param {number} value The amount of money to recharge into the card
 * @return {CreatedOrder} The data the created billet
 */
function CreateBillet(session: string, card: Card, value: number): Promise<CreatedOrder> {
  return useAxios(session).get(BU_PRELOAD_BILLET_CREATE)

    // 1° step: collect validators, set mode, set card design/iss
    .then(() => useAxios(session).get(BU_BILLET_CREATE))
    .then(data => data.data.includes('campoTexto') ? new ExtractableString(data.data) : Promise.reject())
    .then(content => ({
      __VIEWSTATE: content.mpart('__VIEWSTATE', 'value="', '"').toString(),
      __VIEWSTATEGENERATOR: content.mpart('__VIEWSTATEGENERATOR', 'value="', '"').toString(),
      __EVENTVALIDATION: content.mpart('__EVENTVALIDATION', 'value="', '"').toString(),
      hidBasedOnBalance: content.mpart('hidBasedOnBalance', 'value="', '"').toString(),
      cboPedType: BU_BILLET_CREATE_MODE,
      cboApps: `${card.design?.code};${card.iss}`,
      btnNext: content.mpart('btnNext', 'value="', '"').toString()
    }))
    .then(body => useAxios(session).post(BU_BILLET_CREATE, body))
    .then(data => data.data.includes('content_visible') ? new ExtractableString(data.data) : Promise.reject())

    // 2° step: collect validators of second page
    .then(content => ({
      __EVENTTARGET: content.mpart('__EVENTTARGET', 'value="', '"').toString(),
      __EVENTARGUMENT: content.mpart('__EVENTARGUMENT', 'value="', '"').toString(),
      __VIEWSTATE: content.mpart('__VIEWSTATE', 'value="', '"').toString(),
      __VIEWSTATEGENERATOR: content.mpart('__VIEWSTATEGENERATOR', 'value="', '"').toString(),
      __EVENTVALIDATION: content.mpart('__EVENTVALIDATION', 'value="', '"').toString(),
      hidFormatValue: '',
      order: content.mpart('order', 'value="', '"').toString(),
      txtCode: '',
      txtUsuario: '',
      cboGroups: '',
      txtCard: '',
      txtValue: '',
      btnNext: content.mpart('btnNext', 'value="', '"').toString()
    }))

    // 3º step: set value on the card to be recharged
    .then(query => getCardToRecharge(session, card, parseInt(query.order))
      .then(card => {
        const setValueOnCardQuery = new URLSearchParams({
          TYPE: '1',
          NUMBEROFCARDS: '1',
          USRID: `${card.billet?.key}`,
          RIID: `${card.owner}`,
          PRVID: `${card.billet?.user}`,
          VALUE: `${value}`,
          USERNAME: `${card.name}`,
          CARDCODE: `${card.number}`,
          ID: `${card.billet?.line}`,
          RDT_ID: `${card.billet?.id}`
        });

        return useAxios(session).get(`${BU_BILLET_CREATE_LIST}?${setValueOnCardQuery}`);
      })
      .then(recharge => recharge.data.includes('CallBackValue') ? query : Promise.reject()))

    // 4° step: send second data and go to third page
    .then(body => useAxios(session).post(BU_BILLET_CREATE_VALUE, body))
    .then(data => data.data.includes('CabecalhoGrid')
      ? new ExtractableString(data.data)
      : Promise.reject('Unable to register cards to recharge.'))

    // 5° step: collect sumary data to finish creating billet
    .then(data => useAxios(session).post(BU_BILLET_CREATE_CONFIRM, {
      __EVENTTARGET: data.mpart('__EVENTTARGET', 'value="', '"').toString(),
      __EVENTARGUMENT: data.mpart('__EVENTARGUMENT', 'value="', '"').toString(),
      __VIEWSTATE: data.mpart('__VIEWSTATE', 'value="', '"').toString(),
      __VIEWSTATEGENERATOR: data.mpart('__VIEWSTATEGENERATOR', 'value="', '"').toString(),
      __EVENTVALIDATION: data.mpart('__EVENTVALIDATION', 'value="', '"').toString(),
      hidWait: data.mpart('name="hidWait"', 'value="', '"').toString(),
      gbi: data.mpart('name="gbi"', 'value="', '"').toString()
    }))

    // 6° step: create billet and return basic data about it
    .then(data => data.data.includes('Pedido cadastrado com sucesso!')
      ? new ExtractableString(data.data)
      : Promise.reject('Unable to confirm billet creation.'))
    .then(data => {
      const info = data.mpart('popUpPreBillet', '(', ')').split(', ');
      const date = data.mpart('lblDate', '>', '<').split('/');

      return {
        owner: parseInt(info[0].toString()),
        number: parseInt(info[1].toString()),
        status: parseInt(info[2].toString()),
        value: data.mpart('lblOrderValue', '>', '<').toPrice(),
        createdAt: new Date(Date.parse(
          // 2023-03-26T00:00:00.000-03:00
          `${date[2].toString()}-${date[1].toString()}-${date[0].toString()}T00:00:00.000-03:00`
        )),
        service: data.mpart('lblService', '>', '<').toName().toString()
      } as CreatedOrder
    })
}

export default CreateBillet;
