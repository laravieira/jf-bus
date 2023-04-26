import { OrderStatus } from '../models/Order.model';

export function parseOrderStatus(status: string|number): OrderStatus {
  switch(status) {
    case 'Novo': return OrderStatus.NEW;
    case 'Excluído': return OrderStatus.CANCELED;
    case 'Pago e Liberado': return OrderStatus.DONE;
    case '1': return OrderStatus.NEW;
    case '2': return OrderStatus.CANCELED;
    case '3': return OrderStatus.DONE;
    case '4': return OrderStatus.CANCELED;
    case 1: return OrderStatus.NEW;
    case 2: return OrderStatus.CANCELED;
    case 3: return OrderStatus.DONE;
    case 4: return OrderStatus.CANCELED;
    default: return OrderStatus.UNKNOW;
  }
}