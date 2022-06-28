/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, memo, useEffect } from 'react';
import { Alert } from 'react-native';
import * as UpdateAPK from 'rn-update-apk';

export const CheckAppUpdateContext = React.createContext({
  onCheckServerVersion: () => {},
  downloadProgress: 0,
  isDownloading: false,
});

export const CheckAppUpdateProvider = memo(({ children }: any) => {
  const [value, setValue] = useState({
    updater: null,
    onCheckServerVersion: () => {},
    downloadProgress: 0,
    isDownloading: false,
  });

  useEffect(() => {
    // console.log(UpdateAPK.getInstalledVersionName());
    initUpdater();

    /**
     *  LOG  RNUpdateAPK::downloadApk - Old Cert SHA-256: fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c
 LOG  RNUpdateAPK::downloadApk - New Cert SHA-256: 64cbb5666245a6e38c4b8d5f95ddc453180a0b5dad924c7636e58d34cf97b7b7
 LOG  The signature thumbprints seem unequal. Install will fail
     */
  }, []);

  const initUpdater = () => {
    const updater = new UpdateAPK.UpdateAPK({
      // iOS must use App Store and this is the app ID. This is a sample: "All Birds of Ecuador" (¡Qué lindo!)
      iosAppId: 'IOS_APP_STORE_ID',

      apkVersionUrl: 'https://andreassujono.com/halona-server/api/v1/app/version',

      //apkVersionOptions is optional, you should use it if you need to pass options to fetch request
      apkVersionOptions: {
        method: 'GET',
        headers: {},
      },

      //apkOptions is optional
      //Complements or replaces the DownloadFileOptions (from react-native-fs) to download the new APK
      //By default the following options are already set: fromUrl, toFile, begin, progress, background and progressDivider
      //You should use it if you need to pass additional information (for example: headers) to download the new APK
      apkOptions: {
        headers: {},
      },

      // The name of this 'fileProviderAuthority' is defined in AndroidManifest.xml. THEY MUST MATCH.
      // By default other modules like rn-fetch-blob define one (conveniently named the same as below)
      // but if you don't match the names you will get an odd-looking XML exception:
      // "Attempt to invoke virtual method 'android.content.res.XmlResourceParser ....' on a null object reference"
      fileProviderAuthority: 'com.halona',

      // This callback is called if there is a new version but it is not a forceUpdate.
      needUpdateApp: (performUpdate: any) => {
        Alert.alert(
          'Update Available',
          'New version released, do you want to update? ',
          // +
          //   '(TESTING NOTE 1: stop your dev package server now - or the test package will try to load from it ' +
          //   'instead of the included bundle leading to Javascript/Native incompatibilities.' +
          //   'TESTING NOTE 2: the version is fixed at 1.0 so example test updates always work. ' +
          //   'Compare the Last Update Times to verify it installed)',
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
        setValue({
          ...value,
          isDownloading: true,
        });
      },

      // Called with 0-99 for progress during the download
      downloadApkProgress: (progress: number) => {
        console.log(`downloadApkProgress callback called - ${progress}%...`);
        // This is your opportunity to provide feedback to users on download progress
        // If you hae a state variable it is trivial to update the UI
        setValue({
          ...value,
          downloadProgress: progress,
        });
      },

      // This is called prior to the update. If you throw it will abort the update
      downloadApkEnd: () => {
        // This could be an opportunity to check the APK signature thumbprints,
        // If they mismatch your update will fail, the user will have to uninstall first.

        // If you implement SHAsums on the file you could detect tampering here as well

        // Finally for APK25+ you should check REQUEST_INSTALL_PACKAGES permission
        // prior to the attempt at some point, and provide guidance about "unknown sources" etc
        console.log('downloadApkEnd callback called');
        setValue({
          ...value,
          isDownloading: false,
        });
      },

      // This is called if the fetch of the version or the APK fails, so should be generic
      onError: (err: any) => {
        console.log('onError callback called', err);
        Alert.alert('There was an error', err.message);
        setValue({
          ...value,
          isDownloading: false,
        });
      },
    });
    setValue({
      ...value,
      updater,
      onCheckServerVersion: () => {
        updater.checkUpdate();
      },
    });
  };

  return <CheckAppUpdateContext.Provider value={value}>{children}</CheckAppUpdateContext.Provider>;
});
