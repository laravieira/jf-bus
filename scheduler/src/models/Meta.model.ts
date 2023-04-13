import { MetaLine } from './MetaLine.model';

export type Meta = {
  lines: MetaLine[],
  numbers: number[],
  changed: MetaLine[],
  total: number,
  active: number,
  accessible: number,
  updated: Date,
  created: Date
}