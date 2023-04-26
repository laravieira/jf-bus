import { AddressAcronym } from '../models/Address.model';

/** From a given string parse the state name and acronym
 * - 'MG' => { acronym: 'MG', name: 'Minas Gerais' }
 * - 'Acre' => { acronym: 'AC', name: 'Acre' }
 *
 * There is an extra valid 'state' (Why? Idk.):
 * - acronym: 'ST',
 * - name: 'STATEHGFHG'
 *
 * @param state The state string to parse, can be the state name or the state acronym
 * @return The object with parsed acronym and name of the state or null if there is no matches
 */
export function parseAddressStateAcronym(state: string): AddressAcronym|null {
  let acronym: string|undefined;
  let name: string|undefined;
  switch(state) {
    case 'AC': name = 'Acre'; break;
    case 'AL': name = 'Alagoas'; break;
    case 'AP': name = 'Amapá'; break;
    case 'AM': name = 'Amazonas'; break;
    case 'BA': name = 'Bahia'; break;
    case 'CE': name = 'Ceará'; break;
    case 'DF': name = 'Distrito Federal'; break;
    case 'ES': name = 'Espírito Santo'; break;
    case 'GO': name = 'Goiás'; break;
    case 'MA': name = 'Maranhão'; break;
    case 'MT': name = 'Mato Grosso'; break;
    case 'MS': name = 'Mato Grosso do Sul'; break;
    case 'MG': name = 'Minas Gerais'; break;
    case 'PA': name = 'Pará'; break;
    case 'PB': name = 'Paraíba'; break;
    case 'PR': name = 'Paraná'; break;
    case 'PE': name = 'Pernambuco'; break;
    case 'PI': name = 'Piauí'; break;
    case 'RJ': name = 'Rio de Janeiro'; break;
    case 'RN': name = 'Rio Grande do Norte'; break;
    case 'RS': name = 'Rio Grande do Sul'; break;
    case 'RO': name = 'Rondônia'; break;
    case 'RR': name = 'Rorâima'; break;
    case 'SC': name = 'Santa Catarina'; break;
    case 'SP': name = 'São Paulo'; break;
    case 'SE': name = 'Sergipe'; break;
    case 'TO': name = 'Tocântins'; break;
    case 'ST': name = 'STATEHGFHG'; break;
    default: name = undefined; break;
  }

  if(name) return {
    acronym: state,
    name
  };

  switch(state) {
    case 'Acre': acronym = 'AC'; break;
    case 'Alagoas': acronym = 'AL'; break;
    case 'Amapá': acronym = 'AP'; break;
    case 'Amazonas': acronym = 'AM'; break;
    case 'Bahia': acronym = 'BA'; break;
    case 'Ceará': acronym = 'CE'; break;
    case 'Distrito Federal': acronym = 'DF'; break;
    case 'Espírito Santo': acronym = 'ES'; break;
    case 'Goiás': acronym = 'GO'; break;
    case 'Maranhão': acronym = 'MA'; break;
    case 'Mato Grosso': acronym = 'MT'; break;
    case 'Mato Grosso do Sul': acronym = 'MS'; break;
    case 'Minas Gerais': acronym = 'MG'; break;
    case 'Pará': acronym = 'PA'; break;
    case 'Paraíba': acronym = 'PB'; break;
    case 'Paraná': acronym = 'PR'; break;
    case 'Pernambuco': acronym = 'PE'; break;
    case 'Piauí': acronym = 'PI'; break;
    case 'Rio de Janeiro': acronym = 'RJ'; break;
    case 'Rio Grande do Norte': acronym = 'RN'; break;
    case 'Rio Grande do Sul': acronym = 'RS'; break;
    case 'Rondônia': acronym = 'RO'; break;
    case 'Rorâima': acronym = 'RR'; break;
    case 'Santa Catarina': acronym = 'SC'; break;
    case 'São Paulo': acronym = 'SP'; break;
    case 'Sergipe': acronym = 'SE'; break;
    case 'Tocântins': acronym = 'TO'; break;
    case 'STATEHGFHG': acronym = 'ST'; break;
    default: acronym = undefined; break;
  }

  if(acronym) return {
    acronym,
    name: state
  };

  return null;
}
