import { InternetConnectivityContext } from 'Context/useInternetConnectivity';
import { useContext } from 'react';
import Toast from 'react-native-toast-message';
import { useMutation } from 'react-query';

//throw error if call api error
export const validateAfterCall = (
  res: any,
  showError = true,
  showSuccess = false,
  successMessage = ''
) => {
  if (res.errorCode) {
    if (showError) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: res.message,
      });
    }
    return false;
  } else if (showSuccess) {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: successMessage,
    });
  }
  return true;
};

export const handleCallFailure = (message = '', showError = true) => {
  if (showError) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message || 'Server error, Please try again!',
    });
  }
};

//only for POST, PATCH, or DELETE
export const wrapperApiCall = (isConnected = true, func: any): any => {
  if (isConnected) {
    return func;
  }
  return () => {
    throw {
      errorCode: 1,
      message: 'Np internet',
    };
  };
};

export const useWrappedMutation = (func: any, options: any) => {
  const { isConnected } = useContext(InternetConnectivityContext);
  const handler = wrapperApiCall(isConnected, func);
  return useMutation<unknown, unknown, unknown>(handler, options);
};
