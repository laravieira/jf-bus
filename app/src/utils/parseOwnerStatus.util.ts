import { OwnerStatus } from '../models/Owner.model';

export function parseOwnerStatus(status: string|number): OwnerStatus {
  switch(status) {
    case 'Ativo': return OwnerStatus.ACTIVE;
    case 'Inativo': return OwnerStatus.INACTIVE;
    case 'Demitido': return OwnerStatus.FIRED;
    case 'A': return OwnerStatus.ACTIVE;
    case 'I': return OwnerStatus.INACTIVE;
    case 'D': return OwnerStatus.FIRED;
    case 1: return OwnerStatus.ACTIVE;
    case 2: return OwnerStatus.INACTIVE;
    case 3: return OwnerStatus.FIRED;
    default: return OwnerStatus.UNKNOW;
  }
}