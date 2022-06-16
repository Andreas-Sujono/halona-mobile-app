import axios from 'axios';
import BaseService, { API_BASE_URL_PATH } from '../base';

export default class FinanceService extends BaseService {
  getFinanceSummaryThisMonth = async () => {
    const res = await this.getRequest('/finance-records/this-month');
    return res.data;
  };

  getAllFinanceRecords = async () => {
    const res = await this.getRequest('/finance-records/all');
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
