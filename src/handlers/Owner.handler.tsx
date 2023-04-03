import useAxios from '../hooks/useAxios.hook';
import { BU_PATH_OWNER, BU_PRELOAD_OWNER } from '../constants';
import { ExtractableString } from '../utils';

type OwnerCardType = {
  number: string,
  design: string
}

type OwnerAddressType = {
  cep: number,
  state: string,
  city: string,
  district: string,
  street: string,
  number: number,
  complement: string
}

export type OwnerType = {
  id: number,
  name: string,
  cpf: string,
  rg: string,
  group: string,
  birthday: Date|null,
  mother: string,
  card: OwnerCardType,
  class: string,
  daily: number
  status: string
  address: OwnerAddressType
};

function Owner(session: string, id: number) {
  const query = new URLSearchParams({
    'RI_ID': `${id}`
  });

  return useAxios(session).get(BU_PRELOAD_OWNER)
    .then(() => useAxios(session).get(`${BU_PATH_OWNER}?${query}`))
    .then(data => data.data.includes('doCustomValidate') ? new ExtractableString(data.data) : Promise.reject())
    .then(data => {
      const owner = data.part('textoAlerta').split('<td');
      const birth = owner[16].part('value="', '"').split('/');

      return {
        id,
        name: owner[14].part('value="', '"').toName().toString(),
        cpf: owner[6].part('value="', '"').toString(),
        rg: owner[8].part('value="', '"').toString(),
        group: owner[12].mpart('selected', '>', '<').toName().toString(),
        birthday: birth.length < 3 ? null : new Date(Date.parse(
          `${birth[2].toString()}-${birth[1].toString()}-${birth[0].toString()}T00:00:00.000-03:00`)),
        mother: owner[20].part('value="', '"').toName().toString(),
        card: {
          number: owner[10].mpart('lblCardNumber', '><b>', '<').toString(),
          design: owner[26].mpart('selected', '>', '<').part('- ').toName().toString(),
        } as OwnerCardType,
        class: owner[18].part('value="', '"').toString(),
        daily: owner[22].part('value="', '"').toPrice(),
        status: owner[24].mpart('selected', '>', '<').toString(),
        address: {
          cep: parseInt(owner[29].part('value="', '"').toString()),
          state: owner[31].mpart('selected', '>', '<').toName().toString(),
          city: owner[33].part('value="', '"').toName().toString(),
          district: owner[35].part('value="', '"').toName().toString(),
          street: owner[37].part('value="', '"').toName().toString(),
          number: parseInt(owner[39].part('value="', '"').toName().toString()),
          complement: owner[41].part('value="', '"').toName().toString()
        } as OwnerAddressType
    } as OwnerType;
    })
}

export default Owner;