import Line from './Line.handler';
import Meta from './Meta.handler';
import Data from './Data.handler';
import { Line as LineModel } from '../models/Line.model';
import { MetaLine } from '../models/MetaLine.model';

async function SMU() {
  console.log('Starting SMU extractor...');

  const from = parseInt(process.env.SEARCH_LINES_FROM ?? '0');
  const to = parseInt(process.env.SEARCH_LINES_TO ?? '1000');
  const interval = parseInt(process.env.SEARCH_LINES_INTERVAL ?? '200');

  // Get a tousand lines
  const numbers: number[] = [];
  for(let i = from; i < to; numbers.push(i++));

  const meta = await Meta.read().finally(() => console.log('Meta file loaded.'));
  const data = await Data.read().finally(() => console.log('Data file loaded.'));

  const promises: LineModel[] = [];
  for(const number of numbers) {
    await new Promise((r) => setTimeout(r, interval));
    const line = await Line(number)
      .then(line => {
        console.log(`[${ number.toString().padStart(3, '0') }][Ok] Fetched.`);
        return Promise.resolve(line);
      }).catch(error => {
        if(error === `Line ${number} doesn't exist.`) {
          console.log(`[${ number.toString().padStart(3, '0') }][Ok] ${error}`);
          return Promise.resolve(null);
        }else {
          console.error(`[${ number.toString().padStart(3, '0') }][Fail] ${ error }`);
          return Promise.reject(error);
        }
      });
    if(line) promises.push(line);
  }

  const lines: LineModel[] = [
    ...promises
      .filter(line => {
        const old = data.find(old => old.meta.number === line.meta.number)
        return old ? ({ ...line, meta: { ...line.meta, created: old.meta.created } }) : line;
      })
      .map(line => ({ ...line, meta: { ...line.meta, updated: new Date() } })),
    ...data
      .filter(old => !promises.find(line => line.meta.number === old.meta.number))
      .map(old => ({ ...old, meta: { ...old.meta, active: false, updated: new Date() } }))
  ];

  const metas: MetaLine[] = lines.map(line => line.meta);

  await Meta.save({
    lines: metas,
    numbers: metas.map(line => line.number),
    active: metas.reduce((amount, line) => line.active ? ++amount : amount, 0),
    accessible: metas.reduce((amount, line) => line.accessible ? ++amount : amount, 0),
    total: metas.length,
    updated: new Date(),
    created: meta.created
  }).finally(() => console.log('Meta file updated.'));

  await Data.save(lines).finally(() => console.log('Data file updated.'));

  console.log('Extraction successfully completed.');
}

export default SMU;