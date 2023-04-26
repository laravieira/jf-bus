/** @typedef {object} AddressAcronym Acronym and Full Name
 * @property {string} acronym Acronym letters. ex: ["SP", "MG", "RJ"]
 * @property {string} name Full name. ex: ["São Paulo", "Minas Gerais"]
 */

/** @typedef {object} Address Full Address data pack
 * @property {number} id Unique address identifier on database
 * @property {number} cep Address CEP
 * @property {AddressAcronym} state State name and acronym
 * @property {string} city City name
 * @property {string} district District/Neiborhood name
 * @property {string} street Street name
 * @property {number} number House number
 * @property {string} [complement] Address complement, like Ap. 101
 * @property {'RES'|'COM'|'Particular'} [type] Type of address, [RES=Home, COM=Work, Particular=Private]
 */

/** @type AddressAcronym */
export type AddressAcronym = {
  acronym: string,
  name: string
} | null;

/** @type Address */
export type Address = {
  id?: number,
  cep: number,
  state: AddressAcronym,
  city: string,
  district: string,
  street: string,
  number: number,
  complement?: string
  type?: 'RES'|'COM'|'Particular',
}
