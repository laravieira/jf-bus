import { MetaLine } from './MetaLine.model';
import { Schedule } from './Schedule.model';

export type Line = {
  meta: MetaLine,
  ways: {
    going: string,
    coming: string
  },
  path: {
    [going: string]: string[],
    [coming: string]: string[],
    // extentions?: {
    //   [going: string]: {
    //     [name: string]: string[]
    //   }[],
    //   [comming: string]: {
    //     [name: string]: string[]
    //   }[]
    // }
    // observations?: {
    //   [going: string]: string[],
    //   [comming: string]: string[]
    // }
  },
  schedules: Schedule[]
}
