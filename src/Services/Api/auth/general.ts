import axios from 'axios';
import { Id, User } from '../../../model';
import BaseService, { API_BASE_URL_PATH } from '../base';

export default class AuthService extends BaseService {
  signup = async (user: User) => {
    const res = await this.postRequest('/auth/signup', user);
    return res.data;
  };

  login = async (data: any) => {
    const res = await this.postRequest('/auth/login', data);
    return res.data;
  };

  refreshToken = async () => {
    const res = await this.postRequest('/auth/refresh-token', {});
    return res.data;
  };

  getAccount = async (userId: Id) => {
    const res = await this.getRequest(`/users/${userId}`);
    return res.data;
  };
  getMyAccount = async () => {
    const res = await this.getRequest('/users/me');
    return res.data;
  };

  confirmEmail = async (data: any) => {
    const res = await this.getRequest(
      `/auth/confirm-email?email=${data.email}&token=${data.token}`
    );
    return res.data;
  };

  resetPassword = async (data: any) => {
    const res = await this.postRequest('/auth/reset-password', data);
    return res.data;
  };

  changePassword = async (data: any) => {
    const res = await this.postRequest('/auth/change-password', data);
    return res.data;
  };

  resendConfirmation = async (data: any) => {
    const res = await this.postRequest('/auth/resend-confirmation', data);
    return res.data;
  };

  forgotPassword = async (data: any) => {
    const res = await this.postRequest('/auth/forgot-password', data);
    return res.data;
  };

  confirmForgotPassword = async (data: any) => {
    const res = await this.postRequest('/auth/confirm-forgot-password', data);
    return res.data;
  };

  updateAccount = async (data: any, userId: Id) => {
    const res = await this.patchRequest(`/users/${userId}`, data);
    return res.data;
  };

  logout = async () => {
    return {
      errorCode: 0,
      errorMessage: '',
    };
  };

  getLanguage = async (lang = 'en') => {
    console.log('get language', lang);
    const res = await this.getRequest(`/app/language?lang=${lang}`);
    return res.data;
  };
}

//common instance of service
const { CancelToken } = axios;
const source = CancelToken.source();
const canceler = source.cancel;

const authService = new AuthService({
  baseUrl: API_BASE_URL_PATH,
  cancelToken: source.token,
});

export { authService, canceler };
