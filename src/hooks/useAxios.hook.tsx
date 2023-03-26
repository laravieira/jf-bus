import axios, { Axios } from 'axios';
import { BU_COOKIE_SESSION, BU_HOST } from '../constants';

const useAxios: (session?: string) => Axios = (session) => {
  return axios.create({
    headers: session ? {
      'Cookie': `${BU_COOKIE_SESSION}=${session}`
    } : undefined,
    withCredentials: true,
    baseURL: BU_HOST
  });
}

export default useAxios;