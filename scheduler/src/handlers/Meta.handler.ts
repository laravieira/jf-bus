import { readFile, writeFile } from 'fs/promises';
import Path from 'path';
import { existsSync, writeFileSync } from 'fs';
import { Meta } from '../models/Meta.model';

function load(file: string) {
  if(!existsSync(file))
    writeFileSync(file, JSON.stringify({
      lines: [],
      numbers: [],
      total: 0,
      active: 0,
      accessible: 0,
      updated: new Date().toUTCString(),
      created: new Date().toUTCString()
    }));
}

function read(): Promise<Meta> {
  const file = Path.join(`${ __dirname }../../../data/`, `${process.env.SCHEDULE_METADATA ?? ''}.json`)
  load(file);

  return readFile(file)
    .then(data => JSON.parse(data.toString()) as Meta)
    .then(data => ({
      ...data,
      updated: new Date(data.updated),
      created: new Date(data.created)
    }) as Meta);
}

function save(data: Meta): Promise<void> {
  const file = Path.join(`${ __dirname }../../../data/`, `${process.env.SCHEDULE_METADATA ?? ''}.json`)

  return writeFile(file, JSON.stringify({
    ...data,
    updated: data.updated.toUTCString(),
    created: data.created.toUTCString()
  }))
    .then(() => Promise.resolve())
}

const Meta: {
  read: () => Promise<Meta>,
  save: (data: Meta) => Promise<void>
} = {
  read,
  save
}

export default Meta;