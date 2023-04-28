export enum WorkingDay {
  WEEKDAYS,
  SATURDAY,
  HOLYDAYS
}

export enum Way {
  GOING,
  COMMING
}

export type Schedule = {
  day: WorkingDay,
  way: Way,
  time: Date,
  accessible: boolean,
  extra?: string
}