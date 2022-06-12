import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FinanceMainScreen from 'screens/Finance';

const HomeStack = createNativeStackNavigator();

function FinanceStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="FinanceHome">
      <HomeStack.Screen
        name="FinanceHome"
        component={FinanceMainScreen}
        options={{
          headerTitle: 'Finance',
          headerShown: true,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default FinanceStackScreen;
