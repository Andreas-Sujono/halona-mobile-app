import React, { memo, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackScreen from './Home';
import Icon from 'react-native-vector-icons/FontAwesome';

export type RootStackParamList = {
  HomeStack: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const MainNavigator = () => {
  const renderHomeIcon = useCallback(
    (color: string, size: number) => <Icon name="home" color={color} size={size} />,
    []
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomeStack"
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color, size }) => renderHomeIcon(color, size),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default memo(MainNavigator);
