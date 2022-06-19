import {
  composeWithNamespace,
  set as commonSet,
  loadRequest as commonLoadRequest,
  loadSuccess as commonLoadSuccess,
  loadFailed as commonLoadFailed,
} from '@/utils/redux';

const types = ['SET', 'RESET', 'LOAD_REQUEST', 'LOAD_SUCCESS', 'LOAD_FAILED'];

export const ActionTypes = composeWithNamespace(types, 'FINANCE_GENERAL');

export const set = (key: string, value: any) => commonSet(ActionTypes, key, value);

// TODO: separate async (Request, success, failed), for each independent call
export const loadRequest = (data: any) => commonLoadRequest(ActionTypes, data);
export const loadSuccess = (data: any) => commonLoadSuccess(ActionTypes, data);
export const loadFailed = () => commonLoadFailed(ActionTypes);

export const setAllFinanceRecords = (value: any) => set('allFinanceRecords', value);
export const setFinanceSummary = (value: any) => set('financeSummary', value);

export const reset = () => ({
  type: ActionTypes.RESET,
  payload: {},
});
