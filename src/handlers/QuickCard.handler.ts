import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { BU_STORE_QUICKCARD } from '../constants';
import { Owner } from './Owners.handler';

function saveCard(card: Owner): void {
  setItemAsync(BU_STORE_QUICKCARD, JSON.stringify(card))
    .catch(console.warn);
}

function unsaveCard(): void {
  deleteItemAsync(BU_STORE_QUICKCARD)
    .catch(console.warn);
}

function restoreCard(): Promise<Owner> {
  return getItemAsync(BU_STORE_QUICKCARD)
    .then(owner => owner ?? Promise.reject())
    .then(owner => JSON.parse(owner) as Owner);
}

const QuickCard = {
  saveCard,
  restoreCard,
  unsaveCard
};

export default QuickCard;