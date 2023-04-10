import { Page } from './Page.model';
import { OrderStatus } from './Order.model';

/** @typedef {object} CardBillet The card billet ids
 * @property {number} user PRVID: Manager account id
 * @property {number} key RIID: Special card's owner id (worker special id)
 * @property {number} id RDT_ID
 * @property {string} line ID
 */

/** @typedef {object} CardOrder A card order
 * @property {number} id Order's id
 * @property {number} credit Amount recharged to this card
 * @property {OrderStatus} status Order's status
 * @property {string} [charge] Card's recharge status
 */

/** @typedef {object} Card The card used on the bus
 * @property {string} number The card number, as printed on the physical card, like "99.99.99999999-9"
 * @property {string} name Card's owner full name, as printed on the phisical card
 * @property {number} owner Card's owner id (the worker id)
 * @property {number} iss Card's iss number (first part of card's number)
 * @property {number} id Card's riid number (second part of card's number)
 * @property {number} snr Card's snr number (third part of card's number)
 * @property {Date} [createdAt] When the card was created
 * @property {CardDesign} [design] Card's design name and code
 * @property {string} [status] Card's status ["Ativo", "Inativo", "Demitido"]
 * @property {CardBillet} [billet] Card's billet ids (only used on billet creation)
 * @property {Page<CardOrder>} [orders] Card's order history
 */

export enum CardDesign {
  TRANSPORT_TICKET = 400,
  COMMON = 9,
  BILLHETE_UNICO = 570,
  UNKNOW = -1
}

/** @type {CardBillet} */
export type CardBillet = {
  user: number, // PRVID
  key: number, // RIID
  id: number, // RDT_ID
  line: string
};

/** @type {CardOrder} */
export type CardOrder = {
  id: number,
  credit: number,
  status: OrderStatus,
  charge: string
};

/** @type {Card} */
export type Card = {
  number: string, // CARDCODE
  name: string, // USERNAME
  owner: number, // USRID
  iss: number,
  id: number,
  snr: number,
  createdAt?: Date,
  design?: CardDesign,
  status?: string,
  billet?: CardBillet,
  orders?: Page<CardOrder>
};
