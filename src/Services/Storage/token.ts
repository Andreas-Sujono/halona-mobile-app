import { unencryptedSetData, unencryptedGetData, unencryptedRemoveData } from './index';

const JWT_TOKEN_KEY = 'ACCESS_TOKEN';
export const setToken = async (token: string) => {
  return unencryptedSetData(JWT_TOKEN_KEY, { token });
};

export const getToken = async () => {
  const data = await unencryptedGetData(JWT_TOKEN_KEY);
  return data?.token || null;
};

export const clearToken = async () => {
  return unencryptedRemoveData(JWT_TOKEN_KEY);
};
