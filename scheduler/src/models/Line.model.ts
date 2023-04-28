import { MetaLine } from './MetaLine.model';
import { Schedule } from './Schedule.model';

export type Line = {
  meta: MetaLine,
  path: {
    going: string[],
    coming: string[]
  },
  schedules: Schedule[]
}
