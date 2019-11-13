import axios from 'axios';
import errorHandler from './utils/errorHandler';

const { REACT_APP_API_URL } = process.env;

const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
});
export const client = axiosInstance;

client.interceptors.response.use(
  response =>
    // request success ise once buraya gelir

    response,
  error => {
    // request error ise once buraya gelir

    errorHandler(error);

    return Promise.reject(error);
  },
);

export default {
  send: data =>
    client({
      method: 'get',
      url: `/message/${data}`,
    }).then(res => res),
};
