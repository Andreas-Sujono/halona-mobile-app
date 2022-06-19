import React, { useEffect, useState, memo } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

export const InternetConnectivityContext = React.createContext({
  isConnected: true,
  isInternetReachable: true,
  details: null,
});

export const InternetConnectivityProvider = memo(({ children }: any) => {
  const [value, setValue] = useState({
    isConnected: true,
    isInternetReachable: true,
    details: null,
  });

  useEffect(() => {
    handleInternetChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleInternetChange = () => {
    if (!value.isConnected) {
      Toast.show({
        type: 'error',
        text1: 'No internet',
        text2: "There' no internet, Please connect to internet to get the updated data",
      });
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setValue(state as any);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <InternetConnectivityContext.Provider value={value}>
      {children}
    </InternetConnectivityContext.Provider>
  );
});
