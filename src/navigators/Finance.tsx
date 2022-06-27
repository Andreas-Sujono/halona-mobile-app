import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FinanceMainScreen from 'screens/Finance/MainScreen';
import AddFinanceRecordScreen from 'screens/Finance/AddFinanceRecordScreen';
import { selectColors } from 'Store/Selector/auth/theme';
import { useAppSelector } from 'Store';

const HomeStack = createNativeStackNavigator();

function FinanceStackScreen() {
  const colors = useAppSelector(selectColors);

  const options: any = {
    headerStyle: {
      backgroundColor: colors.secondary,
    },
    headerTitleStyle: {
      color: colors.textPrimary,
    },
    headerTintColor: colors.textPrimary,
  };
  return (
    <HomeStack.Navigator initialRouteName="FinanceHome">
      <HomeStack.Screen
        name="FinanceHome"
        component={FinanceMainScreen}
        options={{
          headerTitle: 'Finance',
          headerShown: true,
          headerStyle: {},
          ...options,
        }}
      />
      <HomeStack.Screen
        name="EditFinanceRecord"
        component={AddFinanceRecordScreen}
        options={{
          headerTitle: 'Create/Edit New Record',
          headerShown: true,
          headerBackTitle: 'Back',
          ...options,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default FinanceStackScreen;
