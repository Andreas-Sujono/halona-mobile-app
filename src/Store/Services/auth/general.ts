// import { ConfirmEmailRequest, Id, LoginRequest, User } from './../../../Models/Auth';
import BaseService from '../base';

export default class AuthService extends BaseService {
  signup = async (user: any) => {
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

  getAccount = async (userId: any) => {
    const res = await this.getRequest(`/user/${userId}`);
    return res.data;
  };
  getMyAccount = async () => {
    const res = await this.getRequest('/user/me');
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

  updateAccount = async (data: any, userId: string) => {
    const res = await this.patchRequest(`/user/${userId}`, data);
    return res.data;
  };

  logout = async () => {
    return {
      errorCode: 0,
      errorMessage: '',
    };
  };
}
