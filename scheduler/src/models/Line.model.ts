import { MetaLine } from './MetaLine.model';
import { Schedule } from './Schedule.model';

export type Line = {
  meta: MetaLine,
  name: string,
  path: {
    going: string[],
    coming: string[]
    raw: {
      going: string,
      coming: string
    }
  },
  schedules: Schedule[]
}
