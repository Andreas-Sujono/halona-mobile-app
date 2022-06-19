import { useWrappedMutation, validateAfterCall } from './../utils';
import { selectUserId } from 'Store/Selector/auth';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAppDispatch, useAppSelector } from './../../../Store/index';
import { setIsAuthenticated, setUser } from './../../../Store/Actions/auth/general/general';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';
import { authService } from 'Services/Api/auth/general';
import { QUERY_KEY } from '../queryKeys';
import { setToken } from 'Services/Storage';
import { User } from 'model';

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

  return useWrappedMutation(authService.login, {
    onSuccess: (res: LoginResponse) => {
      if (res.accessToken) {
        //set token
        setToken(res?.accessToken);
        dispatch(setIsAuthenticated(true));
      } else {
        Toast.show({
          type: 'error',
          text1: 'Server Error',
          text2: 'Please input a correct username and password',
        });
      }
    },

    onMutate: async (data: LoginRequest) => {
      /**Optimistic mutation */
    },
    onError: (_err: any, data: LoginRequest) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please try again!',
      });
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries(QUERY_KEY.MY_ACCOUNT);
    },
  });
};

const logout = async (data: any) => true;

export const useLogout = () => {
  const dispatch = useAppDispatch();

  return useMutation(logout, {
    onSuccess: (res) => {
      setToken('');
      dispatch(setIsAuthenticated(false));

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'You have been logged out',
      });
    },

    onMutate: async (data) => {
      /**Optimistic mutation */
    },
    onError: (_err, data, context) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please try again~',
      });
    },
  });
};

export const useMyAccountData = (onSuccess?: any, onError?: any) => {
  return useQuery<User>(QUERY_KEY.MY_ACCOUNT, authService.getMyAccount, {
    onSuccess,
    onError,
  });
};

export const useUpdateMyAccount = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);

  return useWrappedMutation((data: User) => authService.updateAccount(data, userId), {
    onSuccess: (res: any) => {
      if (!validateAfterCall(res, true, true, 'Success updating profile')) {
        return;
      }
    },

    onMutate: async (data: User) => {
      /**Optimistic mutation */
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(QUERY_KEY.MY_ACCOUNT);

      // Snapshot the previous value
      const previousData: any = queryClient.getQueryData(QUERY_KEY.MY_ACCOUNT);

      // Optimistically update to the new value
      queryClient.setQueryData(QUERY_KEY.MY_ACCOUNT, { ...previousData, ...data });
      dispatch(setUser({ ...previousData, ...data }));

      // Return a context with the previous and new todo
      return { previousData, newData: data };
    },
    onError: (_err: any, data: any, context: any) => {
      //revert back updates
      queryClient.setQueryData(QUERY_KEY.MY_ACCOUNT, context.previousData);
      dispatch(setUser(context.previousData));

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please check again your profile!',
      });
    },
    onSettled: () => {
      //after login, refetch get my account
      queryClient.invalidateQueries(QUERY_KEY.MY_ACCOUNT);
    },
  });
};
