import { Address } from './Address.model';
import { Card } from './Card.model';

/** @typedef {object} Owner The owner data
 * @property {number} id Unique owner identifier
 * @property {string} name Owner's full name
 * @property {string} cpf Owner's CPF
 * @property {string} [rg] Owner's RG
 * @property {string} [group] Owner's group
 * @property {Date} [birthday] Owner's birthday
 * @property {string} [mother] Owner's mother full name
 * @property {Card} card Owner's card data
 * @property {string} [class] Owner's class
 * @property {number} [daily] Owner's daily spend credits
 * @property {OwnerStatus} status Owner's status ["Ativo", "Inativo", "Demitido"]
 * @property {Address} [address] Owner's address
 */

export enum OwnerStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  FIRED = 3,
  UNKNOW = 4
}

/** @type Owner */
export type Owner = {
  id: number,
  name: string,
  cpf: string,
  rg?: string,
  group?: string,
  birthday?: Date,
  mother?: string,
  card: Card,
  class?: string,
  daily?: number,
  status: OwnerStatus,
  address?: Address
};