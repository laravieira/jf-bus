/** @template T
 * @typedef {object<T>} Page An generic page structure
 * @property {T[]} items Items on the current page
 * @property {number} current The number of the current page (first valid page is 1)
 * @property {number} pages Amount of pages available
 * @property {number} total Amount of items from all pages
 */

/** @type {Page} */
export type Page<T> = {
  items: T[],
  current: number,
  pages: number,
  total: number
};