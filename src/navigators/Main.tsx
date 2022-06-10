import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackScreen from './Home';

export type RootStackParamList = {
  Home: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
