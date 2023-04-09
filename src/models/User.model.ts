import { Phone } from './Phone.model';
import { Address } from './Address.model';

/** @typedef {object} User Account manager data
 * @property {number} id User unique id, (account manager id)
 * @property {string} status User status
 * @property {string} name User full name
 * @property {string} cpf User CPF
 * @property {string} email User email address
 * @property {string} site User website
 * @property {Phone} phone User phone number
 * @property {boolean} newsletter If user is registered on the newsletter
 * @property {Address[]} address User addresses
 */

/** @type User */
export type User = {
  id: number,
  status: string,
  name: string,
  cpf: string,
  email: string,
  site: string,
  phone: Phone,
  newsletter: boolean,
  address: Address[]
};
