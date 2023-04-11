import useAxios from '../hooks/useAxios.hook';
import { BU_PATH_OWNER, BU_PRELOAD_OWNER } from '../constants';
import { ExtractableString } from '../utils/ExtractableString.util';
import { Address } from '../models/Address.model';
import { parseAddressStateAcronym } from '../utils/parseAddressAcronym.util';
import { Card } from '../models/Card.model';
import { Owner as OwnerModel } from '../models/Owner.model';
import { parseCardNumber } from '../utils/parseCardNumber.util';
import { parseCardDesign } from '../utils/parseCardDesign.util';

/** Return the owner data, with its own card.
 * The return data conteins:
 * - RG
 * - Group
 * - Birthday
 * - Mother's name
 * - Class
 * - Daily rated spends
 * - Address
 * @param session The key of a valid logged session
 * @param id The owner unique ID
 */
function Owner(session: string, id: number): Promise<OwnerModel> {
  const query = new URLSearchParams({
    'RI_ID': `${id}`
  });

  return useAxios(session).get(BU_PRELOAD_OWNER)
    .then(() => useAxios(session).get(`${BU_PATH_OWNER}?${query}`))
    .then(data => data.data.includes('doCustomValidate') ? new ExtractableString(data.data) : Promise.reject())
    .then(data => {
      const owner = data.part('textoAlerta').split('<td');
      const birth = owner[16].part('value="', '"').split('/');
      const name = owner[14].part('value="', '"').toName().toString();
      const cardNumber = owner[10].mpart('lblCardNumber', '><b>', '<').toString();
      const cardData = parseCardNumber(cardNumber);

      return {
        id,
        name,
        cpf: owner[6].part('value="', '"').toString(),
        rg: owner[8].part('value="', '"').toString(),
        group: owner[12].mpart('selected', '>', '<').toName().toString(),
        birthday: birth.length < 3 ? undefined : new Date(Date.parse(
          `${birth[2].toString()}-${birth[1].toString()}-${birth[0].toString()}T00:00:00.000-03:00`)),
        mother: owner[20].part('value="', '"').toName().toString(),
        card: {
          number: cardNumber,
          name,
          owner: id,
          iss: cardData[0],
          snr: cardData[2],
          design: parseCardDesign(owner[26].mpart('selected', '>', '<').toString()),
        } as Card,
        class: owner[18].part('value="', '"').toString(),
        daily: owner[22].part('value="', '"').toPrice(),
        status: owner[24].mpart('selected', '>', '<').toString(),
        address: {
          cep: parseInt(owner[29].part('value="', '"').toString()),
          state: parseAddressStateAcronym(owner[31].mpart('selected', '>', '<').toName().toString()),
          city: owner[33].part('value="', '"').toName().toString(),
          district: owner[35].part('value="', '"').toName().toString(),
          street: owner[37].part('value="', '"').toName().toString(),
          number: parseInt(owner[39].part('value="', '"').toName().toString()),
          complement: owner[41].part('value="', '"').toName().toString()
        } as Address
    } as OwnerModel;
    })
}

export default Owner;