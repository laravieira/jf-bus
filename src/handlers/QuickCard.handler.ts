import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { BU_STORE_QUICKCARD } from '../constants';
import { Owner } from './Owners.handler';

function saveCard(card: Owner): Promise<void> {
  return setItemAsync(BU_STORE_QUICKCARD, JSON.stringify(card));
}

function unsaveCard(): Promise<void> {
  return deleteItemAsync(BU_STORE_QUICKCARD);
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