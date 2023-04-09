/** @typedef {object} Phone Phone number
 * @property {number} country Country identifier
 * @property {number} ddd State identifier (DDD)
 * @property {number} number Phone number without DDD may include 9 digits
 */

/** @type Phone */
export type Phone = {
  country: number,
  ddd: number,
  number: number
};
