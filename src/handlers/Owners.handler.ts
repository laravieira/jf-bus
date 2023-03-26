import { BU_PATH_OWNERS, BU_PRELOAD_OWNERS } from '../constants';
import useAxios from '../hooks/useAxios.hook';
import { ExtractableString } from '../utils';

type CardNumber = {
  number: string,
  status: string,
  iss: number,
  id: number,
  snr: number
}

export type Owner = {
  id: number,
  name: string,
  cpf: string,
  group: string|null,
  status: string,
  card: CardNumber,
  create: Date
};

type OwnersPage = {
  owners: Owner[],
  current: number,
  pages: number,
  total: number
}

function Owners(session: string, page?: number): Promise<any> {
  const query = new URLSearchParams({
    page: `${ page ?? 1 }`,
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
    .then(data => {
      const pages = data.part('page_CallBack', '</script>').split(',');
      const owners = data.split('GridLinha').splice(1, 1).map(line => {
        const owner = line.split('<td');
        const date = owner[8].slice(1).part(null, '</td').split('/');
        const hour = date[2].split(' ')[1].split(':');
        const card = owner[6].part('OpenPageCard(', ')').split(',');
        const group = owner[3].slice(1).part(null, '<').toName();

        return {
          id: parseInt(owner[1].part('>').part('>', '<').toString()),
          name: owner[2].slice(1).part(null, '<').toName().toString(),
          cpf: owner[4].slice(1).part(null, '<').toString(),
          group: group.length ? group : null,
          status: owner[5].part('>', '<').toString(),
          card: {
            number: owner[6].part('>').part('>', '<').toString(),
            status: owner[7].part('>', '<').toString(),
            iss: parseInt(card[0].toString()),
            id: parseInt(card[1].toString()),
            snr: parseInt(card[2].toString())
          } as CardNumber,
          create: new Date(Date.parse(
            // 2023-03-26T10:59:00.000-03:00
          `${date[2].part(null, ' ')}-${date[1]}-${date[0]}T${hour[0]}:${hour[1]}:${hour[2]}.000-03:00`
          ))
        } as Owner;
      });

      return {
        owners,
        current: parseInt(pages[pages.length-3].part('\'', '\'').toString()),
        pages: parseInt(pages[pages.length-2].part('\'', '\'').toString()),
        total: parseInt(pages[pages.length-1].part('\'', '\'').toString())
      } as OwnersPage;
    })
    .then(JSON.stringify)
    .then(console.debug);
}

export default Owners;