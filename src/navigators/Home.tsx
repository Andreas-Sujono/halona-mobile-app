import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from 'screens/Dashboard';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          headerTitle: 'Home',
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
