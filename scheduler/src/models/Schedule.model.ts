export enum WorkingDay {
  WEEKDAYS,
  SATURDAY,
  HOLYDAYS
}

export type Schedule = {
  day: WorkingDay,
  way: string,
  time: Date,
  accessible: boolean,
  extra?: string
}