import { CardStatus } from '../models/Card.model';

export function parseCardStatus(status: string|number): CardStatus {
  switch(status) {
    case 'Aguardando': return CardStatus.WAITING;
    case 'Ativo': return CardStatus.ACTIVE;
    case 'Em Lista de Restrição': return CardStatus.RESTRICTED;
    case 1: return CardStatus.WAITING;
    case 2: return CardStatus.ACTIVE;
    case 3: return CardStatus.RESTRICTED;
    default: return CardStatus.UNKNOW;
  }
}