import React, { useState, memo, useEffect } from 'react';
// import * as UpdateAPK from 'rn-update-apk';

export const CheckAppUpdateContext = React.createContext({
  appVersionDetails: {
    versionName: '0.0.1',
    versionCode: '0.0.1',
    apkUrl: 'https://fyp-ntux.s3.ap-southeast-1.amazonaws.com/apk/app-release.apk',
    forceUpdate: false,
  },
  onCheckServerVersion: () => {},
});

export const CheckAppUpdateProvider = memo(({ children }: any) => {
  const [value, setValue] = useState({
    appVersionDetails: {
      versionName: '0.0.1',
      versionCode: '0.0.1',
      apkUrl: 'https://fyp-ntux.s3.ap-southeast-1.amazonaws.com/apk/app-release.apk',
      forceUpdate: false,
    },
    onCheckServerVersion: () => {},
  });

  // useEffect(() => {
  //   console.log(UpdateAPK.getInstalledVersionCode());
  //   TypeError: null is not an object (evaluating 'RNUpdateAPK.packageName')
  // }, []);

  return <CheckAppUpdateContext.Provider value={value}>{children}</CheckAppUpdateContext.Provider>;
});
