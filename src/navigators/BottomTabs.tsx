import React, { memo, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileStackScreen from './Profile';
import FinanceStackScreen from './Finance';

export type BottomTabsParamList = {
  FinanceStack: undefined;
  HomeStack: undefined;
  ProfileStack: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabsNavigator = () => {
  const renderFinanceIcon = useCallback(
    (color: string, size: number) => <Icon name="money" color={color} size={size} />,
    []
  );
  const renderHomeIcon = useCallback(
    (color: string, size: number) => <Icon name="home" color={color} size={size} />,
    []
  );
  const renderProfileIcon = useCallback(
    (color: string, size: number) => <Icon name="user" color={color} size={size} />,
    []
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeStack"
    >
      <Tab.Screen
        name="FinanceStack"
        component={FinanceStackScreen}
        options={{
          tabBarLabel: 'Finance',
          tabBarIcon: ({ color, size }) => renderFinanceIcon(color, size),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => renderHomeIcon(color, size),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => renderProfileIcon(color, size),
        }}
      />
    </Tab.Navigator>
  );
};

export default memo(BottomTabsNavigator);
