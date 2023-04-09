import { Page } from '../models/Page.model';
import { ExtractableString } from './ExtractableString.util';

/** parsePage Create a Page object
 * @param data The data string to extract the page info
 * @param items The items on the page
 * @param delimiter The delimiter of page info [', "]
 * @return The page object populated with the items and data
 */
export function parsePage<T>(data: ExtractableString, items: T[], delimiter: string = '\''): Page<T> {
  const pages = data.part('page_CallBack', '</script>').split(',');

  return {
    items,
    current: parseInt(pages[pages.length - 3].part(delimiter, delimiter).toString()),
    pages: parseInt(pages[pages.length - 2].part(delimiter, delimiter).toString()),
    total: parseInt(pages[pages.length - 1].part(delimiter, delimiter).toString())
  }
}