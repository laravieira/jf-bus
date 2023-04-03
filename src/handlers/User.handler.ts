import useAxios from '../hooks/useAxios.hook';
import { BU_PATH_USER_ADDRESS, BU_PATH_USER, BU_PRELOAD_USER } from '../constants';
import { ExtractableString } from '../utils';

type UserPhoneType = {
  ddd: number,
  number: number
};

type UserAddressAcronym = {
  acromn: string,
  name?: string
}

type UserAddressType = {
  id: number,
  cep: number,
  state: UserAddressAcronym,
  type: UserAddressAcronym,
  city: string,
  district: string,
  street: string,
  number: number,
  complement: string|undefined
};

export type UserType = {
  id: number,
  status: string,
  name: string,
  cpf: string,
  email: string,
  site: string,
  phone: UserPhoneType,
  newsletter: boolean,
  address: UserAddressType[]
};

function parseAddressType(type: string): string|undefined {
  let converted: string|undefined;
  switch(type) {
    case 'RES': converted = 'Residência'; break;
    case 'COM': converted = 'Empresa'; break;
    case 'Particular': converted = 'Particular'; break;
    default: converted = undefined; break;
  }
  return converted;
}

function parseAddressState(state: string): string|undefined {
  let converted: string|undefined;
  switch(state) {
    case 'AC': converted = 'Acre'; break;
    case 'AL': converted = 'Alagoas'; break;
    case 'AP': converted = 'Amapá'; break;
    case 'AM': converted = 'Amazonas'; break;
    case 'BA': converted = 'Bahia'; break;
    case 'CE': converted = 'Ceará'; break;
    case 'DF': converted = 'Distrito Federal'; break;
    case 'ES': converted = 'Espírito Santo'; break;
    case 'GO': converted = 'Goiás'; break;
    case 'MA': converted = 'Maranhão'; break;
    case 'MT': converted = 'Mato Grosso'; break;
    case 'MS': converted = 'Mato Grosso do Sul'; break;
    case 'MG': converted = 'Minas Gerais'; break;
    case 'PA': converted = 'Pará'; break;
    case 'PB': converted = 'Paraíba'; break;
    case 'PR': converted = 'Paraná'; break;
    case 'PE': converted = 'Pernambuco'; break;
    case 'PI': converted = 'Piauí'; break;
    case 'RJ': converted = 'Rio de Janeiro'; break;
    case 'RN': converted = 'Rio Grande do Norte'; break;
    case 'RS': converted = 'Rio Grande do Sul'; break;
    case 'RO': converted = 'Rondônia'; break;
    case 'RR': converted = 'Rorâima'; break;
    case 'SC': converted = 'Santa Catarina'; break;
    case 'SP': converted = 'São Paulo'; break;
    case 'SE': converted = 'Sergipe'; break;
    case 'TO': converted = 'Tocântins'; break;
    case 'ST': converted = 'STATEHGFHG'; break;
    default: converted = undefined; break;
  }
  return converted;
}

function User(session: string): Promise<UserType> {
  return useAxios(session).get(BU_PRELOAD_USER)
    .then(preload => new ExtractableString(preload.data))
    .then(preload => ({
      id: parseInt(preload.mpart('id="lblId"', '>', '<').toString()),
      status: preload.mpart('id="lblCondition"', '>', '<').toString(),
      data: ''
    }))
    .then(preload => Promise.all([
      useAxios(session).get(BU_PATH_USER),
      useAxios(session).get(BU_PATH_USER_ADDRESS)
    ]).then(resolved => [...resolved, preload]))

    .then(datas => {
      if(!datas[0].data.includes('doCustomValidate'))
        return Promise.reject('Invalid user data response');
      if(!datas[1].data.includes('DivClickConfCep'))
        return Promise.reject('Invalid user address response');
        // @ts-ignore
      if(!datas[2].id)
        return Promise.reject('Invalid user id response');

      return {
        user: new ExtractableString(datas[0].data),
        address: new ExtractableString(datas[1].data),
        preload: datas[2]
      } as { user: ExtractableString, address: ExtractableString, preload: { id: number, status: string } }
    })

    .then(data => {
      const user = data.user.part('trCPF').split('<td');
      return {
        id: data.preload.id,
        status: data.preload.status.length ? data.preload.status : 'Ativo',
        name: user[6].part('value="', '"').toName().toString(),
        cpf: user[2].part('value="', '"').toString(),
        email: user[8].part('value="', '"').toLowerCase(),
        site: user[16].part('value="', '"').toLowerCase(),
        phone: {
          ddd: parseInt(user[12].part('value="', '"').toString()),
          number: parseInt(user[12].mpart('txtPhone"', 'value="', '"').toString())
        },
        newsletter: user[22].includes('checked'),
        address: data.address.split('GridLinha').splice(1).map(data => {
          const address = data.split('<td');
          const type = address[1].part('>', '<').toString();
          const state = address[3].part(',', '<').toString();
          const info = address[2].part('>', '<').split(',');
          const street = info.slice(0, -3).reduce(
            (street, info) => `${street}${info.toString()}`, '');
          const number = info.splice(-3, 1)[0].toString();
          const complment = info.splice(-2, 1)[0];
          return {
            cep: parseInt(address[4].part('>', '<').toString()),
            state: {
              acromn: state.toString(),
              name: parseAddressState(state.toString())
            },
            type: {
              acromn: type.toString(),
              name: parseAddressType(type.toString())
            },
            city: address[3].part('>', ',').toName().toString(),
            district: info.splice(-1)[0].toName().toString(),
            street: new ExtractableString(street).toName().toString(),
            number: number.length ? parseInt(number) : 0,
            complement: complment.length ? complment.toName().toString() : undefined
          } as UserAddressType;
        })
      } as UserType;
    });
}

export default User;
