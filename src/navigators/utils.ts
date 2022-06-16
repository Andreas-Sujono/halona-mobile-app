/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './Main';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: keyof RootStackParamList, params: any = {}) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, {
      initial: false,
      ...params,
    });
  }
};

export const navigateAndReset = (routes = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      })
    );
  }
};

export const navigateAndSimpleReset = (name: keyof RootStackParamList, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      })
    );
  }
};
