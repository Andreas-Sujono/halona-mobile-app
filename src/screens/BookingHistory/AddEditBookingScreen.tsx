import React, { memo, useState } from 'react';
import { Button, Input } from '@ui-kitten/components';
import { Booking, BookingStatus, BookingType } from 'model';
import { StyleSheet, ScrollView, View } from 'react-native';
import Select from 'components/Select';

const bookingStatusData = [
  {
    label: 'Void',
    value: BookingStatus.VOID,
  },
  {
    label: 'Pending',
    value: BookingStatus.PENDING,
  },
  {
    label: 'Paid',
    value: BookingStatus.PAID,
  },
  {
    label: 'Cancelled',
    value: BookingStatus.CANCELLED,
  },
  {
    label: 'Cancelled and money has not returned',
    value: BookingStatus.CANCELLED_AND_MONEY_HAS_NOT_RETURNED,
  },
  {
    label: 'Cancelled and money returned',
    value: BookingStatus.CANCELLED_AND_MONEY_RETURNED,
  },
];
const bookingTypeData = [
  {
    label: 'Online',
    value: BookingType.ONLINE,
  },
  {
    label: 'Walk In',
    value: BookingType.WALK_IN,
  },
];

const BookingSummaryConfirmation = ({ booking }: { booking: Booking }) => {
  return <View>summary</View>;
};

function AddEditBookingScreen({ route }: any) {
  const isEditMode = route?.params?.isEditMode;

  const [bookingData, setBookingData] = useState<Booking>(
    route.params?.bookingData || {
      id: '',
      guestName: '',
      rooms: [],
      price: 180000,
      status: BookingStatus.VOID,
      type: BookingType.ONLINE,
    }
  );

  const updateBookingdata = (key: keyof Booking, value: any) => {
    setBookingData({
      ...bookingData,
      [key]: value,
    });
  };

  return (
    <ScrollView style={styles.Container}>
      <Input
        value={''}
        label="Rooms"
        placeholder="Place your Text"
        onChangeText={(nextValue) => console.log(nextValue)}
        style={styles.input}
      />

      <Select
        label="Booking Status"
        items={bookingStatusData}
        onChangeValue={(value: string) => updateBookingdata('status', value)}
        style={styles.input}
        selectedValue={bookingData.status}
      />

      <Select
        label="Booking Type"
        items={bookingTypeData}
        onChangeValue={(value: string) => updateBookingdata('type', value)}
        style={styles.input}
        selectedValue={bookingData.type}
      />

      {bookingData.type === BookingType.ONLINE && (
        <>
          <Input
            value={''}
            label="Online Provider Name"
            placeholder="Place your Text"
            onChangeText={(nextValue) => console.log(nextValue)}
            style={styles.input}
          />
          <Input
            value={''}
            label="Online Provider Id"
            placeholder="Place your Text"
            onChangeText={(nextValue) => console.log(nextValue)}
            style={styles.input}
          />
        </>
      )}

      <Input
        value={bookingData.price.toString()}
        label="Total Price*"
        placeholder="Place your Text"
        onChangeText={(nextValue) => console.log(nextValue)}
        style={styles.input}
      />

      <Input
        value={bookingData.guestName}
        label="Guest Name*"
        placeholder="Place your Text"
        onChangeText={(nextValue) => console.log(nextValue)}
        style={styles.input}
      />
      <Input
        value={bookingData.guestPhoneNumber}
        label="Guest Phone Number"
        placeholder="Place your Text"
        onChangeText={(nextValue) => console.log(nextValue)}
        style={styles.input}
      />
      <Input
        value={bookingData.guestEmail}
        label="Guest Email"
        placeholder="Place your Text"
        onChangeText={(nextValue) => console.log(nextValue)}
        style={styles.input}
      />
      <Input
        value={bookingData.guestName}
        label="Guest NRIC number"
        placeholder="Place your Text"
        onChangeText={(nextValue) => console.log(nextValue)}
        style={styles.input}
      />
      <Input
        value={bookingData.guestName}
        label="Guest NRIC photo"
        placeholder="Place your Text"
        onChangeText={(nextValue) => console.log(nextValue)}
        style={styles.input}
      />
      <Button
        style={{
          marginTop: 16,
          marginBottom: isEditMode ? 0 : 52,
        }}
      >
        {isEditMode ? 'Edit' : 'Submit'}
      </Button>
      {isEditMode && (
        <Button
          style={{
            marginBottom: 52,
            marginTop: 6,
            backgroundColor: '#de2944',
            border: 0,
          }}
        >
          Delete
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 22,
  },
  input: {
    marginBottom: 12,
  },
});

export default memo(AddEditBookingScreen);
