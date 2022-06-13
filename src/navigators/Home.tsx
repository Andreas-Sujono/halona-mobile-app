import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from 'screens/Dashboard';
import { RoomDetailDrawerProvider } from 'Context/useRoomDetailBottomDrawerContext';

const HomeStack = createNativeStackNavigator();

export const DashboardScreenWrapped = () => (
  <RoomDetailDrawerProvider>
    <DashboardScreen />
  </RoomDetailDrawerProvider>
);

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={DashboardScreenWrapped}
        options={{
          headerTitle: 'Home',
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
