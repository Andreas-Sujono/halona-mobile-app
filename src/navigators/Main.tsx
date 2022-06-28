import React, { useEffect, memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignUpScreen } from 'screens/Login';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from 'Store/Selector/auth';
import BottomTabsNavigator, { BottomTabsParamList } from './BottomTabs';
import { navigateAndSimpleReset, navigationRef } from './utils';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  BottomTabs: BottomTabsParamList;
};

const MainStack = createNativeStackNavigator<RootStackParamList>();

function MainStackScreen() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      //navigate to dashboard directly
      navigateAndSimpleReset('BottomTabs');
    }
  }, [isAuthenticated]);

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          gestureEnabled: true,
        }}
      >
        <MainStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <MainStack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
        {isAuthenticated && (
          <MainStack.Screen
            options={{ headerShown: false }}
            name="BottomTabs"
            component={BottomTabsNavigator}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default memo(MainStackScreen);
