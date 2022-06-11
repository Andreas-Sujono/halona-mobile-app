## Welcome to React native template

#### Libraries used
- UI Kitten --> as the UI framework library
    - https://akveo.github.io/react-native-ui-kitten/docs/components/components-overview
- react native vector icon
    - Note: this library needs additional setup, checkout the official documentation of how to setup on Ios, Android, and Web.
- Redux, Redux persist, redux thunk --> to store offline data or to handle frontend multi screen interaction. It's not suggested to fetch API by calling action, use react query instead.
- Axios
- React query --> to handle API query, all caching is handled by this library. However, to enable the offline mode, all the data needs to be stored in the persisted redux store.
- React navigation
- 

Extras:
- offline --> can read from cache, but cannot post data to server. send notif if no internet, error
- setup eslint & prettier
- run testing
- run debugger --> so we can see the component tree and inside redux store (react native debugger application)
- run performance benchmarking
    https://reactnative.dev/docs/performance
- run pipeline before push (lint -> test -> deploy)
    - auto deploy
    - E2E testing 
        - https://blog.bitrise.io/post/react-native-e2e-ui-testing-with-detox-and-bitrise
        - https://reime005.medium.com/react-native-end-to-end-testing-d488e010e39f


Next:
- animation
- query with graphql, can consider apollo client
- security, storage (fast-image, RN keychain to store token)
- access camera and files
- logging & monitoring
- generate APK file for both androind and ios
    - https://instamobile.io/android-development/generate-react-native-release-build-android/
    - how to upgrade, force upgrade, version update


#### Start application
1) Start metro bundler
- npm run start

2) Build & Install IOS app on dev
- npm run ios

3) Build & Install Androind app on dev
- npm run android
