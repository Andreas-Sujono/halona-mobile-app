import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingHistoryScreen from 'screens/BookingHistory';

const HomeStack = createNativeStackNavigator();

function BookingHistoryStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="BookingHistoryHome">
      <HomeStack.Screen
        name="BookingHistoryHome"
        component={BookingHistoryScreen}
        options={{
          headerTitle: 'Booking History',
          headerShown: true,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default BookingHistoryStackScreen;
