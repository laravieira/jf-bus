import { readFile, writeFile } from 'fs/promises';
import Path from 'path';
import { existsSync, writeFileSync } from 'fs';
import { Line } from '../models/Line.model';
import { MetaLine } from '../models/MetaLine.model';
import { Schedule } from '../models/Schedule.model';

function load(file: string) {
  if(!existsSync(file))
    writeFileSync(file, JSON.stringify([]));
}

function read(): Promise<Line[]> {
  const file = Path.join(`${ __dirname }../../../data/`, `${process.env.SCHEDULE_DATA ?? ''}.json`)
  load(file);

  return readFile(file)
    .then(data => JSON.parse(data.toString()))
    .then((data: []) => data.map((line: Line) => ({
      ...line,
      meta: {
        ...line.meta,
        updated: new Date(line.meta.updated),
        created: new Date(line.meta.created)
      } as MetaLine,
      schedules: line.schedules.map(schedule => ({
        ...schedule,
        time: new Date(schedule.time),
      }) as Schedule)
    }) as Line));
}

function save(lines: Line[]): Promise<void> {
  const file = Path.join(`${ __dirname }../../../data/`, `${process.env.SCHEDULE_DATA ?? ''}.json`)

  return writeFile(file, JSON.stringify(lines.map(line => ({
    ...line,
    meta: {
      ...line.meta,
      updated: line.meta.updated.toUTCString(),
      created: line.meta.created.toUTCString()
    },
    schedules: line.schedules.map(schedule => ({
      ...schedule,
      time: schedule.time.toUTCString(),
    }))
  }))))
    .then(() => Promise.resolve())
}

const Data: {
  read: () => Promise<Line[]>,
  save: (lines: Line[]) => Promise<void>
} = {
  read,
  save
}

export default Data;