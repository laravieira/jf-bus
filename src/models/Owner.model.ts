import { Address } from './Address.model';
import { Card } from './Card.model';

export type Owner = {
  id: number,
  name: string,
  cpf: string,
  rg?: string,
  group?: string,
  birthday?: Date,
  mother?: string,
  card: Card,
  class?: string,
  daily?: number
  status: string
  address?: Address
};