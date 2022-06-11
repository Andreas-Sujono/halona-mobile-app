/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAppDispatch } from './../../../Store/index';
import { setIsAuthenticated } from './../../../Store/Actions/auth/general/general';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';
import { authService } from 'Services/Api/auth/general';
import { QUERY_KEY } from '../queryKeys';
import { setToken } from 'Services/Storage';

interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation(authService.login, {
    onSuccess: (res: LoginResponse) => {
      if (res.accessToken) {
        //set token
        setToken(res?.accessToken);
        dispatch(setIsAuthenticated(true));
      } else {
        Toast.show({
          type: 'error',
          text1: 'Server Error',
          text2: 'Something wrong, Please try again!',
        });
      }
    },

    onMutate: async (data: LoginRequest) => {
      /**Optimistic mutation */
    },
    onError: (_err, data: LoginRequest, context) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Pleae input a correct username and password',
      });
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries(QUERY_KEY.MY_ACCOUNT);
    },
  });
};

export const useMyAccountData = (onSuccess?: any, onError?: any) => {
  return useQuery(QUERY_KEY.MY_ACCOUNT, authService.getMyAccount, {
    onSuccess,
    onError,
    // select: data => {
    //   const superHeroNames = data.data.map(hero => hero.name)
    //   return superHeroNames
    // }
  });
};
