/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
import { Button, Datepicker, Input, Text } from '@ui-kitten/components';
import { Booking, BookingStatus, BookingType } from 'model';
import { StyleSheet, ScrollView, ActivityIndicator, Platform } from 'react-native';
import Select from 'components/Select';
import {
  useBookingData,
  useCreateBooking,
  useDeleteBooking,
  useUpdateBooking,
} from 'hooks/api/booking/useBookingData';
import { useAllRoomsData, useAvailableRoomsData } from 'hooks/api/booking/useRoomData';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from 'hooks/api/queryKeys';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { formatCurrency } from 'utils';
import { navigate } from 'navigators/utils';
import { PopUp } from 'components/PopUp';
import BookingSummary from './BookingSummary';

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
    label: 'Paid & Checked In with deposit',
    value: BookingStatus.CHECKED_IN_WITH_DEPOSIT,
    index: 3,
  },
  {
    label: 'Checked Out',
    value: BookingStatus.CHECKED_OUT,
    index: 4,
  },
  {
    label: 'Cancelled and money has not returned',
    value: BookingStatus.CANCELLED_AND_HAVENT_RETURN_MONEY,
    index: 5,
  },
  {
    label: 'Cancelled and money returned',
    value: BookingStatus.CANCELLED_AND_MONEY_RETURNED,
    index: 6,
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

// const BookingSummaryConfirmation = ({ booking }: { booking: Booking }) => {
//   return <View>summary</View>;
// };

function AddEditBookingScreen({ route }: any) {
  const isEditMode = route?.params?.isEditMode;
  const [bookingData, setBookingData] = useState<Booking>(
    route.params?.bookingData
      ? {
          ...route.params?.bookingData,
          rooms: route.params?.bookingData?.rooms || [],
        }
      : {
          id: '',
          guestName: '',
          rooms: [],
          price: 180000,
          status: BookingStatus.VOID,
          type: BookingType.ONLINE,
        }
  );
  const [showConfirmationPage, setShowConfirmationPage] = useState(false);
  const { mutate: updateBooking, isLoading: isUpdateLoading } = useUpdateBooking(bookingData?.id);
  const { mutate: createBooking, isLoading: isCreateLoading } = useCreateBooking();
  const { mutate: deleteBooking, isLoading: isDeleteLoading } = useDeleteBooking(bookingData?.id);

  const queryClient = useQueryClient();
  const { data } = useBookingData(bookingData.id);
  const { data: availableRooms } = useAllRoomsData();

  useEffect(() => {
    queryClient.invalidateQueries(QUERY_KEY.AVAIL_ROOMS);

    if (bookingData.id) {
      queryClient.invalidateQueries([QUERY_KEY.BOOKING, bookingData.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const validateBookingData = () => {
    let errMessage = '';
    if (!bookingData.guestName) {
      errMessage = 'Missing Guest Name';
    }
    if (!bookingData.bookingStartDate) {
      errMessage = 'Missing booking start date';
    }
    if (!bookingData.bookingEndDate) {
      errMessage = 'Missing booking end date';
    }
    if (!bookingData.price) {
      errMessage = 'Missing booking amount';
    }
    if (!bookingData.rooms.length) {
      errMessage = 'Missing rooms';
    }

    if (errMessage) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errMessage,
      });
      return false;
    }

    return true;
  };

  const onGoToConfirm = () => {
    //validate
    if (!validateBookingData()) {
      return;
    }
    setShowConfirmationPage(true);
  };

  const onCreate = async () => {
    //validate
    if (!validateBookingData()) {
      return;
    }
    createBooking(bookingData);
    setShowConfirmationPage(false);
    navigate('BottomTabs', {
      screen: 'BookingHistoryStack',
      params: {
        screen: 'BookingHistoryHome',
      },
    });
  };

  const onEdit = () => {
    //validate
    if (!validateBookingData()) {
      return;
    }
    updateBooking(bookingData);
    return;
  };

  const onDelete = () => {
    PopUp.show({
      title: 'Are you sure you want to delete this booking?',
      type: 'confirm',
      textBody: 'You cannot undo this action!',
      callback: () => deleteBooking({}),
    });
    return;
  };

  if (showConfirmationPage) {
    return (
      <BookingSummary
        bookingData={bookingData}
        onCancel={() => setShowConfirmationPage(false)}
        onCreate={onCreate}
      />
    );
  }

  const chosenRoomIds = bookingData.rooms.map((item) => item.id);
  return (
    <ScrollView style={styles.Container}>
      <Select
        label="Rooms"
        items={availableRooms || []}
        onChangeValue={(values) => updateBookingdata('rooms', values)}
        style={styles.input}
        selectedValue={chosenRoomIds}
        isMultiple
        placeholder="select room numbers"
      />

      <Select
        label="Booking Status"
        items={isEditMode ? bookingStatusData : bookingStatusData.slice(0, 4)}
        onChangeValue={(value: any) => updateBookingdata('status', value.value)}
        style={styles.input}
        selectedValue={bookingData.status as any}
        // disabled={!isEditMode}
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
            value={bookingData.onlineProviderName}
            label="Online Provider Name"
            placeholder="Place your Text"
            onChangeText={(value: any) => updateBookingdata('onlineProviderName', value)}
            style={styles.input}
          />
          <Input
            value={bookingData.onlineProviderOrderId}
            label="Online Provider Id"
            placeholder="Place your Text"
            onChangeText={(value: any) => updateBookingdata('onlineProviderOrderId', value)}
            style={styles.input}
          />
        </>
      )}

      <Datepicker
        label="Booking Start Date"
        placeholder="Booking Start Date"
        filter={(date) => new Date(date) >= moment().startOf('day').toDate()}
        style={styles.input}
        onSelect={(date) => updateBookingdata('bookingStartDate', date)}
        date={bookingData.bookingStartDate ? new Date(bookingData.bookingStartDate) : undefined}
      />

      <Datepicker
        label="Booking End Date"
        placeholder="Booking End Date"
        filter={(date) => new Date(date) >= moment().startOf('day').toDate()}
        style={styles.input}
        onSelect={(date) => updateBookingdata('bookingEndDate', date)}
        date={bookingData.bookingEndDate ? new Date(bookingData.bookingEndDate) : undefined}
      />

      <Input
        value={bookingData.price.toString()}
        label="Total Price*"
        placeholder="Place your Text"
        onChangeText={(value: any) => updateBookingdata('price', value)}
        style={styles.input}
        keyboardType="decimal-pad"
      />

      <Input
        value={bookingData.guestName}
        label="Guest Name*"
        placeholder="Place your Text"
        onChangeText={(value: any) => updateBookingdata('guestName', value)}
        style={styles.input}
      />
      <Input
        value={bookingData.guestPhoneNumber}
        label="Guest Phone Number"
        placeholder="Place your Text"
        onChangeText={(value: any) => updateBookingdata('guestPhoneNumber', value)}
        style={styles.input}
        keyboardType="number-pad"
      />
      <Input
        value={bookingData.guestEmail}
        label="Guest Email"
        placeholder="Place your Text"
        onChangeText={(value: any) => updateBookingdata('guestEmail', value)}
        style={styles.input}
      />
      <Input
        value={bookingData.guestNRIC}
        label="Guest NRIC number"
        placeholder="Place your Text"
        onChangeText={(value: any) => updateBookingdata('guestNRIC', value)}
        style={styles.input}
      />
      <Input
        value={bookingData.description}
        label="Booking description/ notes"
        placeholder="Ex: early check in, extends, late check out"
        onChangeText={(value: any) => updateBookingdata('description', value)}
        style={styles.input}
      />
      <Input
        value={bookingData.pendingPricePaid?.toString()}
        label="Pending price paid"
        placeholder="Place your Text"
        onChangeText={(value: any) => updateBookingdata('pendingPricePaid', value)}
        style={styles.input}
      />
      {/* <Input
        value={bookingData.guestName}
        label="Guest NRIC photo"
        placeholder="Place your Text"
        onChangeText={(value: any) => updateBookingdata('onlineProviderName', value)}
        style={styles.input}
      /> */}
      {!isEditMode && (
        <Button
          style={{
            marginTop: 16,
            marginBottom: isEditMode ? 0 : 52,
          }}
          onPress={onGoToConfirm}
        >
          Add new Booking
        </Button>
      )}
      {isEditMode && (
        <Button
          style={{
            marginTop: 16,
            marginBottom: isEditMode ? 0 : 52,
          }}
          onPress={onEdit}
          disabled={isUpdateLoading}
        >
          {isUpdateLoading ? <ActivityIndicator /> : 'Edit Booking'}
        </Button>
      )}
      {isEditMode && (
        <Button
          style={{
            marginBottom: 52,
            marginTop: 6,
            backgroundColor: '#de2944',
            borderWidth: 0,
          }}
          onPress={onDelete}
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
    padding: Platform.OS === 'ios' ? 24 : 26,
    paddingTop: 22,
  },
  input: {
    marginBottom: 12,
  },
  confirmationInputLabel: {
    color: 'grey',
    marginBottom: 8,
  },
  confirmationInputValue: {
    fontWeight: '500',
  },
});

export default memo(AddEditBookingScreen);
