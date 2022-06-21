## Welcome to React native template

#### Libraries used
- UI Kitten --> as the UI framework library
    - https://akveo.github.io/react-native-ui-kitten/docs/components/components-overview
- react native vector icon
    - Note: this library needs additional setup, checkout the official documentation of how to setup on Ios, Android, and Web.
    - for every npm run ios, you need to disable react-native config and run pod install
- Redux, Redux persist, redux thunk --> to store offline data or to handle frontend multi screen interaction. It's not suggested to fetch API by calling action, use react query instead.
- Axios
- React query --> to handle API query, all caching is handled by this library. However, to enable the offline mode, all the data needs to be stored in the persisted redux store.
- React navigation
- react-native-toast-message
- styled-components


features:
- v - slider bottom drawer (DONE)
- v - other notification popup (DONE)
- v - infinite scrolling (DONE*)
- v - offline cache data (DONE - save in redux persist)
- v - check for no internet, cannot POST data (DONE - create mutation wrapper + query structure)
- auto update app, apk 
    - https://github.com/mikehardy/react-native-update-apk/blob/master/example/App.js
- customized splash screen and app icon for both ios and android (auto update from server) 


Extras:
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
- splash screen: https://blog.logrocket.com/building-a-splash-screen-in-react-native/
- auto update, auto update splash screen, icon
- change app icon: https://aboutreact.com/react-native-change-app-icon/
- connect to bluetooth - ex: to print


Next:
- animation
- query with graphql, can consider apollo client
- security, storage (fast-image, RN keychain to store token)
- access camera and files
- logging & monitoring
- generate APK file for both androind and ios
    - https://instamobile.io/android-development/generate-react-native-release-build-android/
    - https://reactnative.dev/docs/signed-apk-android
        - always update the password in android/gradle.properties
        - generate apk from aab --> https://www.youtube.com/watch?v=5tgcogEoIiQ&ab_channel=ProgrammingwithMash
    - how to upgrade, force upgrade, version update



#### Start application
1) Start metro bundler
- npm run start

2) Build & Install IOS app on dev
- npm run ios

3) Build & Install Androind app on dev
- npm run android


#### App features
- Home dashboard
    - summary statistics: avail room, net income
    - floor plan
        - update room detail / status
    - notification
        - show all notification (date, time, by)

- Finance
    - summary statistics: 
    - show 12 months this year
        - show all months
        - show all records
        - filter by: income, cost, date / month range
    - recent activities

booking history
    - search bar 
        - filter by: date / month, status
    - show all booking (infinite scrolling)