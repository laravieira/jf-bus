/** @typedef {object} Login The login package credentials
 * @property {string} user The only number CPF to login
 * @property {string} password The password to login
 * @property {boolean} [keep] If auto login will be enabled (save credentials and auto login whenever is needed)
 */

/** @type Login */
export type Login = {
  user: string,
  password: string,
  keep?: boolean
}
