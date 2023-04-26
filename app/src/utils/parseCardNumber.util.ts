import { ExtractableString } from './ExtractableString.util';

/** Parse the card number into the tree separeted numbers
 * - '11.22.33333333-4' => [11, 22, 33333333]
 * - '01.02.00033333-4' => [1, 2, 33333]
 * @param number The card number with dots and dashes
 * @return An array with iss, design, snr respectively parsed to numbers.
 */
export function parseCardNumber(number: ExtractableString|string): number[] {
  if(typeof number === 'string')
    number = new ExtractableString(number);
  const value = number.part(null, '-').split('.');

  return [
    parseInt(value[0].toString()),
    parseInt(value[1].toString()),
    parseInt(value[2].toString()),
  ];
}
