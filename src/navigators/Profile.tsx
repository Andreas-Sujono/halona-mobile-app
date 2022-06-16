import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileMain from 'screens/Profile';
import UpdateProfileScreen from 'screens/Profile/UpdateProfile';

const HomeStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="ProfileHome">
      <HomeStack.Screen
        name="ProfileHome"
        component={ProfileMain}
        options={{
          headerTitle: 'Profile',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{
          headerTitle: 'Update Profile',
          headerShown: true,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default ProfileStackScreen;
