import axios from '../utils/axios.util';
import { ExtractableString } from '../utils/ExtractableString.util';
import { Line as LineModel } from '../models/Line.model';
import { decode } from 'iconv-lite';
import { MetaLine } from '../models/MetaLine.model';
import { Schedule, Way, WorkingDay } from '../models/Schedule.model';

function rawWorkingDay(day: WorkingDay): string {
  if(day === WorkingDay.WEEKDAYS)
    return 'DIAS ÚTEIS';
  if(day === WorkingDay.SATURDAY)
    return 'SÁBADOS';
  if(day === WorkingDay.HOLYDAYS)
    return 'DOMINGOS E FERIADOS';
  return '';
}

function extractSchedules(data: ExtractableString, day: WorkingDay, name: string = 'CENTRO'): Schedule[] {
  return data.part(`<b>${rawWorkingDay(day)}</b>`)
    .mpart(`<b>Saídas de ${name.toUpperCase()}</b>`, '<table>', '</table>')
    .split('<td>')
    .filter(item => item.includes(':'))
    .map(item => {
      const time = item.part(null, ' ').split(':');
      return {
        day,
        way: name.includes('CENTRO') ? Way.COMMING : Way.GOING,
        time: new Date(Date.parse(
          // 1970-01-01T23:59:00.000+00:00
          `1970-01-01T${time[0]}:${time[1]}:00.000+00:00`
        )),
        accessible: item.includes('wheelchair'),
        extra: item.includes('title') ? item.mpart('title', ' - ', '"').toString().trim() : undefined
      } as Schedule;
    });
}

function Line(number: number): Promise<LineModel|null> {
  const body = {
    psq_lin: 'num',
    psq_txtval: number,
    psq_sub: 'Buscar'
  }

  return axios().post(process.env.SMUJF_SCHEDULE ?? '', body)
    // If line doesn't exist
    .then(data => data.data.includes('linha_inexistente')
      ? Promise.reject(`Line ${number} doesn't exist.`)
      : data)

    // If line data is valid
    .then(data => data.data.includes('dados_linha')
      ? decode(
        data.data,
        new ExtractableString(data.headers['content-type'])
          .part('charset=', ';')
          .toString()
      )
      : Promise.reject(`Unable to fetch line ${number}.`)
    )
    .then(data => new ExtractableString(data).part('dados_linha'))

    .then(data => {
      const name = data.mpart('nome_bairro', '>', '<').toString();
      const ways = name.split('/').map(item => item.trim().toUpperCase());

      return {
        meta: {
          number: parseInt(data.mpart('numero_linha', '>', '<').toString()),
          name,
          created: new Date(),
          updated: new Date(),
          active: true,
          accessible: data.includes('Ve&iacute;culo Adaptado'),
        } as MetaLine,
        path: {
          going: data.part('<b>ITINERÁRIO</b>')
            .mpart('<b>IDA</b>', '<p>', '</p>')
            .toString()
            .replace('\r\n', '\n')
            .split('\n')
            .map(item => item.trim().replace(/[,.]+$/, ''))
            .filter(item => item !== ''),
          coming: data.part('<b>ITINERÁRIO</b>')
            .mpart('<b>VOLTA</b>', '<p>', '</p>')
            .toString()
            .replace('\r\n', '\n')
            .split('\n')
            .map(item => item.trim().replace(/[,.]+$/, ''))
            .filter(item => item !== ''),
        },
        schedules: [
          ...ways.map(way => [
            ...extractSchedules(data, WorkingDay.WEEKDAYS, way),
            ...extractSchedules(data, WorkingDay.SATURDAY, way),
            ...extractSchedules(data, WorkingDay.HOLYDAYS, way)
          ]).flat(1),
          ...extractSchedules(data, WorkingDay.WEEKDAYS),
          ...extractSchedules(data, WorkingDay.SATURDAY),
          ...extractSchedules(data, WorkingDay.HOLYDAYS)
        ]
      } as LineModel;
    })
}

export default Line;