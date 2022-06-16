import React, { memo, useEffect, useState } from 'react';
import { Button, Input } from '@ui-kitten/components';
import { Booking, BookingStatus, BookingType } from 'model';
import { StyleSheet, ScrollView, View } from 'react-native';
import Select from 'components/Select';
import { useBookingData } from 'hooks/api/booking/useBookingData';

const bookingStatusData = [
  {
    label: 'Void',
    value: BookingStatus.VOID,
    index: 0,
  },
  {
    label: 'Pending',
    value: BookingStatus.PENDING,
    index: 1,
  },
  {
    label: 'Paid',
    value: BookingStatus.PAID,
    index: 2,
  },
  {
    label: 'Cancelled',
    value: BookingStatus.CANCELLED,
    index: 3,
  },
  {
    label: 'Cancelled and money has not returned',
    value: BookingStatus.CANCELLED_AND_MONEY_HAS_NOT_RETURNED,
    index: 4,
  },
  {
    label: 'Cancelled and money returned',
    value: BookingStatus.CANCELLED_AND_MONEY_RETURNED,
    index: 5,
  },
];
const bookingTypeData = [
  {
    label: 'Online',
    value: BookingType.ONLINE,
    index: 0,
  },
  {
    label: 'Walk In',
    value: BookingType.WALK_IN,
    index: 1,
  },
];

const mockRooms = [
  {
    id: '1212',
    name: '101',
    label: '101',
    value: '21211',
    index: 0,
  },
  {
    id: '1412',
    name: '102',
    label: '102',
    value: '1412',
    index: 1,
  },
  {
    id: '1512',
    name: '103',
    label: '103',
    value: '1512',
    index: 2,
  },
];

// const BookingSummaryConfirmation = ({ booking }: { booking: Booking }) => {
//   return <View>summary</View>;
// };

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
  const { data } = useBookingData(bookingData.id);

  useEffect(() => {
    if (data) {
      setBookingData({
        ...bookingData,
        ...data,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const updateBookingdata = (key: keyof Booking, value: any) => {
    setBookingData({
      ...bookingData,
      [key]: value,
    });
  };

  return (
    <ScrollView style={styles.Container}>
      <Select
        label="Rooms"
        items={mockRooms}
        onChangeValue={(values) => updateBookingdata('rooms', values)}
        style={styles.input}
        selectedItem={bookingData.rooms as any}
        isMultiple
      />

      <Select
        label="Booking Status"
        items={bookingStatusData}
        onChangeValue={(value: any) => updateBookingdata('status', value.value)}
        style={styles.input}
        selectedValue={bookingData.status as any}
      />

      <Select
        label="Booking Type"
        items={bookingTypeData}
        onChangeValue={(value: any) => updateBookingdata('type', value.value)}
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
            borderWidth: 0,
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
