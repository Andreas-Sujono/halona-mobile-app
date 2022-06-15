import {
  composeWithNamespace,
  set as commonSet,
  loadRequest as commonLoadRequest,
  loadSuccess as commonLoadSuccess,
  loadFailed as commonLoadFailed,
} from '@/utils/redux';
import { User } from 'model';

const types = ['SET', 'RESET', 'LOAD_REQUEST', 'LOAD_SUCCESS', 'LOAD_FAILED'];

export const ActionTypes = composeWithNamespace(types, 'AUTH_GENERAL');

export const set = (key: string, value: any) => commonSet(ActionTypes, key, value);

// TODO: separate async (Request, success, failed), for each independent call
export const loadRequest = (data: any) => commonLoadRequest(ActionTypes, data);
export const loadSuccess = (data: any) => commonLoadSuccess(ActionTypes, data);
export const loadFailed = () => commonLoadFailed(ActionTypes);

export const setIsAuthenticated = (isAuthenticated: boolean) =>
  set('isAuthenticated', isAuthenticated);
export const setUser = (user: User) => set('user', user);

export const reset = () => ({
  type: ActionTypes.RESET,
  payload: {},
});
