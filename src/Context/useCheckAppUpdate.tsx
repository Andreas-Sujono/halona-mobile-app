import React, { useEffect, useState, memo } from 'react';
import { Alert } from 'react-native';
import * as UpdateAPK from 'rn-update-apk';

export const CheckAppUpdateContext = React.createContext({
  updater: null,
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
    updater: null,
    appVersionDetails: {
      versionName: '0.0.1',
      versionCode: '0.0.1',
      apkUrl: 'https://fyp-ntux.s3.ap-southeast-1.amazonaws.com/apk/app-release.apk',
      forceUpdate: false,
    },
    isLoading: false,
    progressMeter: 0,
  });

  const updateState = (key: keyof typeof value, value: any) => {
    setValue({
      ...value,
      [key]: value,
    });
  };

  useEffect(() => {
    const updater = new UpdateAPK.UpdateAPK({
      // iOS must use App Store and this is the app ID. This is a sample: "All Birds of Ecuador" (¡Qué lindo!)
      iosAppId: 'APP_STORE_ID',
      apkVersionUrl: 'https://andreassujono.com/halona-server/api/v1/common/app-version',

      //apkVersionOptions is optional, you should use it if you need to pass options to fetch request
      apkVersionOptions: {
        method: 'GET',
        headers: {},
      },
      // The name of this 'fileProviderAuthority' is defined in AndroidManifest.xml. THEY MUST MATCH.
      fileProviderAuthority: 'com.halona',

      // This callback is called if there is a new version but it is not a forceUpdate.
      needUpdateApp: (performUpdate: any) => {
        Alert.alert(
          'Update Available',
          'New version released, do you want to update? ' +
            '(TESTING NOTE 1: stop your dev package server now - or the test package will try to load from it ' +
            'instead of the included bundle leading to Javascript/Native incompatibilities.' +
            'TESTING NOTE 2: the version is fixed at 1.0 so example test updates always work. ' +
            'Compare the Last Update Times to verify it installed)',
          [
            { text: 'Cancel', onPress: () => {} },
            // Note, apps can be large. You may want to check if the network is metered (cellular data) to be nice.
            // Note that the user will likely get a popup saying the device is set to block installs from uknown sources.
            // ...you will need to guide them through that, maybe by explaining it here, before you call performUpdate(true);
            { text: 'Update', onPress: () => performUpdate(true) },
          ]
        );
      },

      // This will be called before the download/update where you defined forceUpdate: true in the version JSON
      forceUpdateApp: () => {
        console.log('forceUpdateApp callback called');
      },

      // Called if the current version appears to be the most recent available
      notNeedUpdateApp: () => {
        console.log('notNeedUpdateApp callback called');
      },

      // This is passed to react-native-fs as a callback
      downloadApkStart: () => {
        console.log('downloadApkStart callback called');
      },

      // Called with 0-99 for progress during the download
      downloadApkProgress: (progress: any) => {
        console.log(`downloadApkProgress callback called - ${progress}%...`);
        // This is your opportunity to provide feedback to users on download progress
        // If you hae a state variable it is trivial to update the UI
        updateState('progressMeter', progress);
      },

      // This is called prior to the update. If you throw it will abort the update
      downloadApkEnd: () => {
        console.log('downloadApkEnd callback called');
      },

      // This is called if the fetch of the version or the APK fails, so should be generic
      onError: (err: any) => {
        console.log('onError callback called', err);
        Alert.alert('There was an error', err.message);
      },
    });

    updateState('updater', updater);
  }, []);

  useEffect(() => {
    UpdateAPK.getApps()
      .then((apps: any) => {
        console.log('Installed Apps: ', JSON.stringify(apps));
        // this.setState({ allApps: apps });
      })
      .catch((e: any) => console.log('Unable to getApps?', e));

    UpdateAPK.getNonSystemApps()
      .then((apps: any) => {
        console.log('Installed Non-System Apps: ', JSON.stringify(apps));
        // this.setState({ allNonSystemApps: apps });
      })
      .catch((e: any) => console.log('Unable to getNonSystemApps?', e));
  }, []);

  const onCheckServerVersion = () => {
    console.log('checking for update');
    if (value.updater) {
      (value.updater as any).checkUpdate();
    }
    return;
  };

  console.log('value updater: ', value);
  return (
    <CheckAppUpdateContext.Provider
      value={{
        ...value,
        onCheckServerVersion,
      }}
    >
      {children}
    </CheckAppUpdateContext.Provider>
  );
});
