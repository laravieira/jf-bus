import { Page } from './Page.model';
import { Card } from './Card.model';

/** @typedef {object|number} OrderOwner Order Owner's data or only its ID
 * @property {number} id Order owner's id (account manager)
 * @property {string} name Order owner's full name
 * @property {string} cpf Order owner's CPF
 */

/** @typedef {object} OrderValues Order prices
 * @property {number} recarges The total value of the desired card recharges
 * @property {number} paid The value paid by the client
 * @property {number} taxes Tax value
 * @property {number} total Total value of recharges plus tax
 */

/** @typedef {object} OrderRechargePeriod Date range of the recharges to be available on the buses
 * @property {Date} from Initial date
 * @property {Date} to Final date (after that is granted that your card will be recharged on the next use)
 */

/** @typedef {object} Order Order full data
 * @property {number} id The global unique order id
 * @property {OrderOwner} owner The owner id, name, CPF (owner is the account manager)
 * @property {number} number The ordered id per owner
 * @property {number} status Order status [1=New, 2=Canceled, 3=Done, 4=CanceledAfterDone]
 * @property {number} value Order price value (same as this.values.total)
 * @property {OrderValues} [values] The detailed order's values
 * @property {Date} createdAt When the order was created
 * @property {Date} [paidAt] When the order was paid by the client
 * @property {OrderRechargePeriod} [rechargePeriod] Date range of the recharges to be available on the buses
 * @property {Page<Card>} [cards] List of cards to recharge on this order, those cards has one order on its order history, representing this order data
 * @property {string} service Person's name responsible for processing this order
 */

export enum OrderStatus {
  NEW = 1,
  CANCELED = 2,
  DONE = 3,
  UNKNOW = 4
}

/** @type OrderOwner */
export type OrderOwner = {
  id: number,
  name: string,
  cpf: string
}|number;

/** @type OrderValues */
export type OrderValues = {
  recarges: number,
  paid: number,
  taxes: number,
  total: number
};

/** @type OrderRechargePeriod */
export type OrderRechargePeriod = {
  from: Date,
  to: Date
};

/** @type Order */
export type Order = {
  id?: number,
  owner: OrderOwner,
  number: number,
  status: OrderStatus,
  value: number,
  values?: OrderValues,
  createdAt: Date,
  paidAt?: Date,
  rechargePeriod?: OrderRechargePeriod
  cards?: Page<Card>,
  service?: string
};
