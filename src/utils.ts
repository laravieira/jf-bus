export class ExtractableString extends String {
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

  toPrice(): number {
    const string = this.toString();
    return parseFloat(string
      .slice(string.indexOf(' ')+1)
      .replace('.', '')
      .replace(',', '')
    )
  }

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

  slices(...from: string[]): ExtractableString {
    return new ExtractableString(
      from.reduce(
        (slice, from) => from.length ? slice.slice(slice.indexOf(from)) : slice,
        this.toString()
      )
    );
  }

  part(begin: string|null, end?: string, keep_begin: boolean = false): ExtractableString {
    let string = this.toString();
    string = begin?.length ? string.slice(string.indexOf(begin)) : string;
    string = (begin?.length && !keep_begin) ? string.slice(begin.length) : string;
    string = end?.length ? string.slice(0, string.indexOf(end)) : string;

    return new ExtractableString(string);
  }

  mpart(from: string, begin: string, end?: string, keep_begin: boolean = false): ExtractableString {
    let string = this.toString();
    string = from.length ? string.slice(string.indexOf(from)) : string;

    return new ExtractableString(string).part(begin, end, keep_begin);
  }
}