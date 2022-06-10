import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from 'screens/Dashboard';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={DashboardScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
