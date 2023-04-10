import { CardDesign } from '../models/Card.model';

export function parseCardDesign(design: string|number): CardDesign {
  switch(design) {
    // All available card types
    case '04 - VALE TRANSPORTE': return CardDesign.TRANSPORT_TICKET;
    case '09 - COMUM': return CardDesign.COMMON;
    case '20 - BILHETE UNICO': return CardDesign.BILLHETE_UNICO;
    case 'VALE TRANSPORTE': return CardDesign.TRANSPORT_TICKET;
    case 'COMUM': return CardDesign.COMMON;
    case 'BILHETE UNICO': return CardDesign.BILLHETE_UNICO;
    case '04': return CardDesign.TRANSPORT_TICKET;
    case '09': return CardDesign.COMMON;
    case '4': return CardDesign.TRANSPORT_TICKET;
    case '9': return CardDesign.COMMON;
    case '20': return CardDesign.BILLHETE_UNICO;
    case 4: return CardDesign.TRANSPORT_TICKET;
    case 9: return CardDesign.COMMON;
    case 20: return CardDesign.BILLHETE_UNICO;

    // Only rechargable card types
    case '400-V.T.': return CardDesign.TRANSPORT_TICKET;
    case '570-B.U.': return CardDesign.BILLHETE_UNICO;
    case '400': return CardDesign.TRANSPORT_TICKET;
    case '570': return CardDesign.BILLHETE_UNICO;
    case 400: return CardDesign.TRANSPORT_TICKET;
    case 570: return CardDesign.BILLHETE_UNICO;

    // Unknow card type, represent a valid card type id -1.
    default: return CardDesign.UNKNOW;
  }
}