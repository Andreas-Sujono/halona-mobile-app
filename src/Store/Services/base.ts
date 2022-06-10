import axios, { CancelToken } from 'axios';
import { parseObjectToCamelCase } from 'utils';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://18.141.202.3' : '';

export interface ApiResponse {
  errorCode: number;
  status: number;
}

export type ApiRequestData = Record<string, any> | FormData;

export default class BaseService {
  _baseUrl: string;
  _cancelToken: CancelToken | null;

  constructor({
    baseUrl = '',
    cancelToken = null,
  }: {
    baseUrl: string;
    cancelToken: CancelToken | null;
  }) {
    this._baseUrl = baseUrl;
    this._cancelToken = cancelToken;
  }

  joinURL = (...args: string[]) => {
    return args.join('');
  };

  parseData = (data: ApiRequestData, config: any = {}) => {
    config = config || {};

    const headersPayload = config?.headers || { headers: {} };

    if (headersPayload['Content-Type'] === undefined) {
      headersPayload['Content-Type'] = 'application/json';
    } else if (headersPayload['Content-Type'] === null) {
      delete headersPayload['Content-Type'];
    }

    config.headers = {};
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`; //FIXME: get JWT token here

    switch (headersPayload['Content-Type']) {
      case 'application/json':
        return { data: data, config };
      case 'multipart/form-data':
      default: {
        if (data instanceof FormData) {
          const fd: any = new FormData();
          // for (const key of data.keys()) { //FIXME: copy formdata data here
          //   fd.append(key, data.get(key));
          // }

          return { data: fd, config: config };
        }
        return { data: data, config };
      }
    }
  };

  getRequest = async (url: string) => {
    try {
      const parsedData = this.parseData({}, {});
      const finalUrl = this.joinURL(API_URL, this._baseUrl, url);
      const response: ApiResponse = await axios.get(finalUrl, parsedData.config);
      if (response.errorCode === 401 || response.status === 401) {
        // unauthorized
        // localStorage.clear(); //FIXME: clear JWT token here
      }
      return parseObjectToCamelCase(response);
    } catch (err: any) {
      return {
        data: {
          errorCode: err.response.status,
          ...err.response.data,
        },
      };
    }
  };

  postRequest = async (url: string, data: ApiRequestData, config: any = {}) => {
    try {
      const parsedData = this.parseData(data, config);
      const finalUrl = this.joinURL(API_URL, this._baseUrl, url);

      const response = await axios.post(finalUrl, parsedData.data, parsedData.config);

      return response;
    } catch (err: any) {
      return {
        data: {
          errorCode: err.response.status,
          ...err.response.data,
        },
      };
    }
  };

  patchRequest = async (url: string, data: ApiRequestData, config: any = {}) => {
    try {
      const parsedData = this.parseData(data, config);
      const finalUrl = this.joinURL(API_URL, this._baseUrl, url);

      const response: ApiResponse = await axios.patch(finalUrl, parsedData.data, parsedData.config);
      return parseObjectToCamelCase(response);
    } catch (err: any) {
      return {
        data: {
          errorCode: err.response.status,
          ...err.response.data,
        },
      };
    }
  };

  deleteRequest = async (url: string, data: ApiRequestData, config: any = {}) => {
    try {
      const parsedData = this.parseData(data, config);
      const finalUrl = this.joinURL(API_URL, this._baseUrl, url);

      const response: ApiResponse = await axios.delete(finalUrl, parsedData.config);
      return parseObjectToCamelCase(response);
    } catch (err: any) {
      return {
        data: {
          errorCode: err.response.status,
          ...err.response.data,
        },
      };
    }
  };
}
