import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { BU_STORE_QUICKCARD } from '../constants';
import { Card } from '../models/Card.model';

/** Save Card data on local storage
 * @param card The card object used on the bus (with deisgn data)
 */
function saveCard(card: Card): Promise<Card> {
  if(!card.design)
    return Promise.reject('The card must contein design data, try using Owner handler.');
  return setItemAsync(BU_STORE_QUICKCARD, JSON.stringify(card))
    .then(() => card);
}

/** Remove card from local storage */
function unsaveCard(): Promise<void> {
  return deleteItemAsync(BU_STORE_QUICKCARD);
}

/** Restore card from local storage
 * This card conteins the design data required to create an order.
 */
function restoreCard(): Promise<Card> {
  return getItemAsync(BU_STORE_QUICKCARD)
    .then(card => card ?? Promise.reject())
    .then(card => JSON.parse(card) as Card);
}

const QuickCard = {
  saveCard,
  restoreCard,
  unsaveCard
};

export default QuickCard;