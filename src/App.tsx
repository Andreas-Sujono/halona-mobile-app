import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from 'Store/Store';
import ApplicationMainNavigator from 'navigators/Main';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import { QueryClientProvider, QueryClient } from 'react-query';
import { PopUpProvider } from 'components/PopUp';
import { InternetConnectivityProvider } from 'Context/useInternetConnectivity';

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     * FIXME: add loading of SplashScreen
     */}
    <PersistGate loading={null} persistor={persistor}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <PopUpProvider>
            <InternetConnectivityProvider>
              <ApplicationMainNavigator />
            </InternetConnectivityProvider>
          </PopUpProvider>
        </QueryClientProvider>
      </ApplicationProvider>
    </PersistGate>
    <Toast />
  </Provider>
);

export default App;
