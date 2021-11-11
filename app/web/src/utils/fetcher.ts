import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

axios.defaults.headers.common['x-csrf-token'] = Cookies.get('csrfToken') || '';

const fetcher = axios;

export default fetcher;

export {
  AxiosRequestConfig as FetcherRequestConfig,
  AxiosResponse as FetcherResponse,
};
