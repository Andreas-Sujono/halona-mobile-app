import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileMain from 'screens/Profile';

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
    </HomeStack.Navigator>
  );
}

export default ProfileStackScreen;
