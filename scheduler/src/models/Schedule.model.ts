export enum WorkingDays {
  WEEKDAYS,
  SATURDAY,
  HOLYDAYS
}

export enum Way {
  GOING,
  RETURNING
}

export type Schedule = {
  working: WorkingDays[],
  way: Way,
  time: Date,
  accessible: boolean,
  extra: string
}