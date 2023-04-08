/** @typedef {object} CreatedOrder CreatedOrder Model
 * @property {number} owner The user id (manager account)
 * @property {number} number It's the unique incremental number per user account
 * @property {number} status Order status [1=New, 2=Canceled, 3=Done, 4=CanceledAfterDone]
 * @property {number} value Total order price
 * @property {Date} createdAt Date of order's creation
 * @property {string} service Person's name responsible for processing this order
 */

/** @type CreatedOrder */
export type CreatedOrder = {
  owner: number,
  number: number,
  status: number,
  value: number,
  createdAt: Date,
  service: string
}