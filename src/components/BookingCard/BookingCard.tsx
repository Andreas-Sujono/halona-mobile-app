import { Card, Text } from '@ui-kitten/components';
import { Booking, BookingStatus } from 'model';
import { navigate } from 'navigators/utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { formatCurrency, formatDate } from 'utils';

export const mapBookingStatusToInfo = {
  [BookingStatus.VOID]: {
    label: 'Cancelled',
    color: 'yellow',
  },
  [BookingStatus.PENDING]: {
    label: 'Pending',
    color: 'yellow',
  },
  [BookingStatus.PAID]: {
    label: 'Paid',
    color: 'green',
  },
  [BookingStatus.CHECKED_IN_WITH_DEPOSIT]: {
    label: 'Checked In with deposit',
    color: 'green',
  },
  [BookingStatus.PARTIAL_CHECKED_IN]: {
    label: 'PARTIAL check in',
    color: 'green',
  },
  [BookingStatus.CHECKED_OUT]: {
    label: 'Checked out',
    color: 'green',
  },
  // [BookingStatus.CANCELLED]: {
  //   label: 'Cancelled',
  //   color: 'grey',
  // },
  [BookingStatus.CANCELLED_AND_MONEY_RETURNED]: {
    label: 'Cancelled and money returned',
    color: 'grey',
  },
  [BookingStatus.CANCELLED_AND_HAVENT_RETURN_MONEY]: {
    label: 'Cancelled and money has not returned',
    color: 'red',
  },
};

function BookingCard({ booking }: { booking: Partial<Booking> }) {
  const bookingStatusInfo = mapBookingStatusToInfo[booking.status!];

  const goToAddEditBookingScreen = () =>
    navigate('BottomTabs', {
      screen: 'BookingHistoryStack',
      params: {
        screen: 'BookingHistoryAddBooking',
        params: {
          isEditMode: true,
          bookingData: booking,
          initial: false,
        },
      },
    });

  return (
    <Card style={styles.Container} onPress={goToAddEditBookingScreen}>
      <Text
        category="p1"
        style={{
          fontWeight: 'bold',
        }}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        Booking {booking.id!} - {booking.guestName || 0}
      </Text>
      <Text>
        {booking.rooms?.length || 0} Rooms (
        {(booking?.rooms?.map((room) => room.name) || []).join(', ')})
      </Text>
      <View style={[styles.InputContainer, , { marginTop: 12 }]}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.inputValue}>
          {formatDate(booking.bookingStartDate)} - {formatDate(booking.bookingEndDate)}
        </Text>
      </View>
      <View style={[styles.InputContainer]}>
        <Text style={styles.label}>Status:</Text>
        <Text
          style={[
            styles.inputValue,
            {
              color: bookingStatusInfo.color,
            },
          ]}
        >
          {bookingStatusInfo.label}
        </Text>
      </View>
      <View style={styles.InputContainer}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.inputValue}>{formatCurrency(booking.price!)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  InputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    color: 'grey',
    marginRight: 12,
  },
  inputValue: {
    fontWeight: '500',
  },
});

export default BookingCard;
