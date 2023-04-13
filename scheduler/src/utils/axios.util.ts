import TheAxios, { Axios } from 'axios';

const axios: () => Axios = () => {
  return TheAxios.create({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL: process.env.SMUJF_HOST ?? '',
    responseType: 'arraybuffer',
    responseEncoding: 'binary'
  });
}

export default axios;