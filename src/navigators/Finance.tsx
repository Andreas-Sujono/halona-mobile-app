import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FinanceMainScreen from 'screens/Finance/MainScreen';
import AddFinanceRecordScreen from 'screens/Finance/AddFinanceRecordScreen';

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
      <HomeStack.Screen
        name="EditFinanceRecord"
        component={AddFinanceRecordScreen}
        options={{
          headerTitle: 'Create/Edit New Record',
          headerShown: true,
          headerBackTitle: 'Back',
        }}
      />
    </HomeStack.Navigator>
  );
}

export default FinanceStackScreen;
