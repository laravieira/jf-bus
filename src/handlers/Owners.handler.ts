import { BU_PATH_OWNERS, BU_PRELOAD_OWNERS } from '../constants';
import useAxios from '../hooks/useAxios.hook';
import { ExtractableString } from '../utils/ExtractableString.util';
import { Page } from '../models/Page.model';
import { Owner } from '../models/Owner.model';
import { parsePage } from '../utils/parsePage.util';
import { Card } from '../models/Card.model';
import { parseCardDesign } from '../utils/parseCardDesign.util';

/** Return Page object with list of owners registered to the current logged user (account manager)
 *
 * The owners data is the basic info
 * @param session The key of a valid logged session
 * @param [page=1] Page where of owners to fetch
 */
function Owners(session: string, page: number = 1): Promise<Page<Owner>> {
  const query = new URLSearchParams({
    page: `${ page }`,
    type: '1',
    field: '',
    group: '',
    groupdesc: '',
    status: 'A',
    order: '0'
  });

  return useAxios(session).get(BU_PRELOAD_OWNERS)
    .then(() => useAxios(session).get(`${BU_PATH_OWNERS}?${query}`))
    .then(data => data.data.includes('CabecalhoGrid') ? new ExtractableString(data.data) : Promise.reject())
    .then(data => parsePage<Owner>(
      data,
      data.split('GridLinha').splice(1, 1).map(line => {
        const owner = line.split('<td');
        const date = owner[8].slice(1).part(null, '</td').split('/');
        const hour = date[2].split(' ')[1].split(':');
        const card = owner[6].part('OpenPageCard(', ')').split(',');
        const group = owner[3].slice(1).part(null, '<').toName();
        const id = parseInt(owner[1].part('>').part('>', '<').toString());
        const name = owner[2].slice(1).part(null, '<').toName().toString();

        return {
          id,
          name,
          cpf: owner[4].slice(1).part(null, '<').toString(),
          group: group.length ? group.toString() : undefined,
          status: owner[5].part('>', '<').toString(),
          card: {
            number: owner[6].part('>').part('>', '<').toString(),
            name,
            owner: id,
            status: owner[7].part('>', '<').toString(),
            iss: parseInt(card[0].toString()),
            design: parseCardDesign(card[1].toString()),
            snr: parseInt(card[2].toString())
          } as Card,
          create: new Date(Date.parse(
            // 2023-03-26T10:59:00.000-03:00
            `${ date[2].part(null, ' ') }-${ date[1] }-${ date[0] }T${ hour[0] }:${ hour[1] }:${ hour[2] }.000-03:00`
          )).toISOString()
        } as Owner;
      })
    ));
}

export default Owners;