/** @typedef {object} LoginState The login management state
 * @property {boolean} logged If user is logged with a valid session
 * @property {boolean} loading If login request is happening
 * @property {string|null} session The key of the current valid logged session
 * @property {string|null} user The logged account's CPF
 * @property {boolean} autoLogged If last login request was made by autologin nor user input
 * @property {number} since Timestamp of when last login happen
 */

/** @type LoginState */
export type LoginState = {
  logged: boolean,
  loading: boolean,
  session: string|null,
  user: string|null,
  autoLogged: boolean,
  since: number
};
