/**
 * ExtractableString extends String class, not the string type.
 * For more info on the extra functions see:
 * [laravieira/Scraping](https://github.com/laravieira/Scraping#global-functions)
 *
 * - toName ([upname](https://github.com/laravieira/Scraping#upname)): Format and return string to name formats (first each word character is uppercase)
 * - toPrice ([price](https://github.com/laravieira/Scraping#price)): Return float value of and price string of type 'xx$: 9.999,99'
 * - removeAccents ([accents](https://github.com/laravieira/Scraping#accents)): Replace accentuation with equivalent characters
 * - part ([strpart](https://github.com/laravieira/Scraping#strpart)): Return middle string between start and end strings
 * - mpart ([strmpart](https://github.com/laravieira/Scraping#strmpart)): Return middle string between start2 and end string, which start2 is after start1
 */
export class ExtractableString extends String {
  /** Format and return string to name formats (first each word character is uppercase)
   * Clone of [upname](https://github.com/laravieira/Scraping#upname).
   */
  toName(): ExtractableString {
    return new ExtractableString(
      this.trimEnd().split(' ').reduce((name, word) => {
        if(word == 'I' || word == 'II' || word == 'III' || word == 'IV' || word == 'V' || word == 'VI')
          return `${name} ${word}`;
        else if(word.length < 3)
          return `${name} ${word.toLowerCase()}`;
        else
          return `${name} ${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`;
      }, '').trim()
    );
  }

  /** Return float value of and price string of type 'xx$: 9.999,99'
   * Clone of [price](https://github.com/laravieira/Scraping#price).
   */
  toPrice(): number {
    const string = this.toString();
    return parseFloat(string
      .slice(string.indexOf(' ')+1)
      .replace('.', '')
      .replace(',', '.')
    )
  }

  /** Replace accentuation with equivalent characters
   * Clone of [accents](https://github.com/laravieira/Scraping#accents).
   */
  removeAccents(): ExtractableString {
    const REPLACE_FROM = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ';
    const REPLACE_TO = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';

    return new ExtractableString(
      [...REPLACE_FROM].reduce(
        (replaced, from, to) => replaced.replaceAll(from, REPLACE_TO[to]),
        this.toString()
      ).trim()
    );
  }

  // @ts-ignore
  slice(start: number, end: number = this.length): ExtractableString {
    return new ExtractableString(this.toString().slice(start, end));
  }

  // @ts-ignore
  split(separator: string | RegExp, limit?: number): ExtractableString[] {
    return this.toString().split(separator, limit).map(string => new ExtractableString(string));
  }

  // @ts-ignore
  replace(searchValue: string | RegExp, replaceValue: string): ExtractableString {
    return new ExtractableString(this.toString().replace(searchValue, replaceValue));
  }

  // @ts-ignore
  replaceAll(searchValue: string | RegExp, replaceValue: string): ExtractableString {
    return new ExtractableString(this.toString().replaceAll(searchValue, replaceValue));
  }

  slices(...from: string[]): ExtractableString {
    return new ExtractableString(
      from.reduce(
        (slice, from) => from.length ? slice.slice(slice.indexOf(from)) : slice,
        this.toString()
      )
    );
  }

  /** Return middle string between start and end strings
   * Clone of [strpart](https://github.com/laravieira/Scraping#strpart).
   */
  part(begin: string|null, end?: string, keep_begin: boolean = false): ExtractableString {
    let string = this.toString();
    string = begin?.length ? string.slice(string.indexOf(begin)) : string;
    string = (begin?.length && !keep_begin) ? string.slice(begin.length) : string;
    string = end?.length ? string.slice(0, string.indexOf(end) === -1 ? undefined : string.indexOf(end)) : string;

    return new ExtractableString(string);
  }

  /** Return middle string between start2 and end string, which start2 is after start1
   * Clone of [strmpart](https://github.com/laravieira/Scraping#strmpart).
   */
  mpart(from: string, begin: string, end?: string, keep_begin: boolean = false): ExtractableString {
    let string = this.toString();
    string = from.length ? string.slice(string.indexOf(from)) : string;

    return new ExtractableString(string).part(begin, end, keep_begin);
  }
}
