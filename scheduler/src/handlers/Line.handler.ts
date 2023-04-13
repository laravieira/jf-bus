import axios from '../utils/axios.util';
import { ExtractableString } from '../utils/ExtractableString.util';
import { Line as LineModel } from 'models/Line.model';
import { decode } from 'iconv-lite';

function Line(number: number): Promise<LineModel> {
  const body = {
    psq_lin: 'num',
    psq_txtval: number,
    psq_sub: 'Buscar'
  }

  return axios().post(process.env.SMUJF_SCHEDULE ?? '', body)
    // If line doesn't exist
    .then(data => data.data.includes('linha_inexistente')
      ? Promise.reject('Invalid Line.')
      : data)

    // If line data is valid
    .then(data => data.data.includes('dados_linha')
      ? decode(
        data.data,
        new ExtractableString(data.headers['content-type'])
          .part('charset=', ';')
          .toString()
      )
      : Promise.reject('Unable to fetch.')
    )
    .then(data => new ExtractableString(data))

    .then(data => {
      console.debug(data.toString());
      return {

      } as LineModel;
    });
}

export default Line;