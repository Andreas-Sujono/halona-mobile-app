import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileMain from 'screens/Profile';
import UpdateProfileScreen from 'screens/Profile/UpdateProfile';
import SettingScreen from 'screens/Profile/Settings';
import { useAppSelector } from 'Store';
import { selectColors } from 'Store/Selector/auth/theme';

const HomeStack = createNativeStackNavigator();

function ProfileStackScreen() {
  const colors = useAppSelector(selectColors);

  const options: any = {
    headerStyle: {
      backgroundColor: colors.secondary,
    },
    headerTitleStyle: {
      color: colors.textPrimary,
    },
    headerBackTitleStyle: {
      color: colors.textPrimary,
      backgroundColor: colors.textPrimary,
    },
    headerTintColor: colors.textPrimary,
  };
  return (
    <HomeStack.Navigator initialRouteName="ProfileHome">
      <HomeStack.Screen
        name="ProfileHome"
        component={ProfileMain}
        options={{
          headerTitle: 'Profile',
          headerShown: false,
          ...options,
        }}
      />
      <HomeStack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{
          headerTitle: 'Update Profile',
          headerShown: true,
          ...options,
        }}
      />
      <HomeStack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerTitle: 'Settings',
          headerShown: true,
          ...options,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default ProfileStackScreen;
