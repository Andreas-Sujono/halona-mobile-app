import React from 'react';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import BookingHistoryScreen from 'screens/BookingHistory/MainScreen/index';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddEditBookingScreen from 'screens/BookingHistory/AddEditBookingScreen';
import { navigate } from './utils';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeStack = createNativeStackNavigator();

function BookingHistoryStackScreen() {
  const goToAddEditBookingScreen = () =>
    navigate('BottomTabs', {
      screen: 'BookingHistoryStack',
      params: {
        screen: 'BookingHistoryAddBooking',
        params: {
          isEditMode: false,
          initial: false,
        },
      },
    });

  const renderHomeHeader = (props: NativeStackHeaderProps) => (
    <SafeAreaView style={styles.bookingHeader}>
      <Text category="h6" style={styles.bookingHeaderText}>
        {props?.options?.headerTitle as string}
      </Text>
      <TouchableOpacity style={styles.bookingHeaderButton} onPress={goToAddEditBookingScreen}>
        <Icon name="plus" size={16} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );

  // const renderEditBookingHeader = (props: NativeStackHeaderProps) => (
  //   <View style={styles.bookingHeader}>
  //     <Icon name="" />
  //     <Text category="h6" style={styles.bookingHeaderText}>
  //       {(props.route.params as any).isEditMode ? 'Edit Booking' : 'Create Booking'}
  //     </Text>
  //   </View>
  // );

  return (
    <HomeStack.Navigator initialRouteName="BookingHistoryHome">
      <HomeStack.Screen
        name="BookingHistoryHome"
        component={BookingHistoryScreen}
        options={{
          headerTitle: 'Booking History',
          headerShown: true,
          header: renderHomeHeader,
        }}
      />
      <HomeStack.Screen
        name="BookingHistoryAddBooking"
        component={AddEditBookingScreen}
        options={{
          headerTitle: 'Create/Edit New Booking',
          headerShown: true,
          headerBackTitle: 'Back',
          // header: renderEditBookingHeader,
        }}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  bookingHeader: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  bookingHeaderText: {
    fontWeight: '500',
  },
  bookingHeaderButton: {
    position: 'absolute',
    right: 16,
    top: 12,
    borderRadius: 30,
    width: 40,
    height: 40,
    padding: 0,
    margin: 0,
    backgroundColor: '#456be9',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookingHistoryStackScreen;
