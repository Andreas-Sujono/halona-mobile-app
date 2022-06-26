import { FinanceRecord } from './../../../model/room';
import axios from 'axios';
import BaseService, { API_BASE_URL_PATH } from '../base';
import { Id } from 'model';
import moment from 'moment';

export default class FinanceService extends BaseService {
  getFinanceSummaryThisMonth = async () => {
    const res = await this.getRequest('/finance-records/until-date');
    return res.data;
  };

  getAllFinanceRecords = async () => {
    const res = await this.getRequest('/finance-records?sort=date,DESC&sort=createdAt,DESC');
    return res.data;
  };

  getAllFinanceRecordsPaginated = async () => {
    const res = await this.getRequest('/finance-records/all');
    return res.data;
  };

  getOneFinanceRecord = async (recordId: Id) => {
    if (!recordId) {
      return null;
    }
    const res = await this.getRequest(`/finance-records/${recordId}`);
    return res.data;
  };
  createFinanceRecord = async (data: FinanceRecord) => {
    const mappedData: any = data;
    delete mappedData.id;
    if (!data.date) {
      mappedData.date = new Date();
    }
    const res = await this.postRequest('/finance-records', mappedData);
    return res.data;
  };

  updateFinanceRecord = async (recordId: Id, data: FinanceRecord) => {
    // console.log('dataL ', data);
    if (data.date) {
      data.date = moment(data.date).add(1, 'day').toDate();
    }
    const res = await this.patchRequest(`/finance-records/${recordId}`, data);
    return res.data;
  };

  deleteFinanceRecord = async (recordId: Id) => {
    const res = await this.deleteRequest(`/finance-records/${recordId}`);
    return res.data;
  };
}

//common instance of service
const { CancelToken } = axios;
const source = CancelToken.source();
const canceler = source.cancel;

const financeService = new FinanceService({
  baseUrl: API_BASE_URL_PATH,
  cancelToken: source.token,
});

export { financeService, canceler };
