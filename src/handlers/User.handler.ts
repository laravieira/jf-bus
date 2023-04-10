import useAxios from '../hooks/useAxios.hook';
import { BU_PATH_USER_ADDRESS, BU_PATH_USER, BU_PRELOAD_USER } from '../constants';
import { parseAddressStateAcronym } from '../utils/parseAddressAcronym.util';
import { User as UserModel } from '../models/User.model';
import { Address } from '../models/Address.model';
import { ExtractableString } from '../utils/ExtractableString.util';

/** Returns User (Account manager) details data
 * @param session The key of a valid logged session
 */
function User(session: string): Promise<UserModel> {
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
            state: parseAddressStateAcronym(state.toString()),
            city: address[3].part('>', ',').toName().toString(),
            district: info.splice(-1)[0].toName().toString(),
            street: new ExtractableString(street).toName().toString(),
            number: number.length ? parseInt(number) : 0,
            type: type.toString() as 'RES'|'COM'|'Particular',
            complement: complment.length ? complment.toName().toString() : undefined
          } as Address;
        })
      } as UserModel;
    });
}

export default User;
