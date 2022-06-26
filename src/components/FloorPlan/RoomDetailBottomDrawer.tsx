/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Divider, IndexPath, Input, Text } from '@ui-kitten/components';
import BookingCard from 'components/BookingCard';
import { PopUp } from 'components/PopUp';
import BottomDrawer from 'components/PopUp/BottomDrawer';
import { DrawerState } from 'components/PopUp/BottomDrawer/BottomDrawer';
import Select from 'components/Select';
import { useCheckInBooking, useCheckOutBooking } from 'hooks/api/booking/useBookingData';
import { useUpdateRoom } from 'hooks/api/booking/useRoomData';
import { Room, RoomStatus } from 'model';
import { navigate } from 'navigators/utils';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { formatCurrency } from 'utils';

const statusData = [
  {
    label: 'Not Available',
    value: RoomStatus.NOT_AVAILABLE,
    index: 0,
  },
  {
    label: 'Available',
    value: RoomStatus.AVAILABLE,
    index: 1,
  },
  {
    label: 'Booked',
    value: RoomStatus.BOOKED,
    index: 2,
    disabled: true,
  },
  {
    label: 'Inhabited',
    value: RoomStatus.INHABITED,
    index: 3,
    disabled: true,
  },
  {
    label: 'Need to be cleaned',
    value: RoomStatus.ROOM_NEED_TO_BE_CLEANED,
    index: 4,
  },
  {
    label: 'Guest out & Need to be cleaned',
    value: RoomStatus.GUEST_OUT_AND_NEED_TO_BE_CLEANED,
    index: 5,
  },
];

function RoomDetailBottomDrawer({ room, onClose }: { room: Room; onClose: () => void }) {
  const [roomData, setRoomData] = useState(room);
  const [selectedIndex, setSelectedIndex] = React.useState<any>(new IndexPath(0));
  const { mutate, isLoading } = useUpdateRoom(room.id);
  const { mutate: checkInMutate } = useCheckInBooking(-1);
  const { mutate: checkOutMutate } = useCheckOutBooking(-1);

  const currentBooking =
    room.currentBooking && Object.keys(room.currentBooking).length > 0
      ? room.currentBooking
      : (room as any)?.activeBookings?.[0] || null;

  const onDrawerStateChange = (state: DrawerState) => {
    if (state === DrawerState.CLOSED) {
      onClose();
    }
  };

  const updateRoomData = (key: keyof Room, value: any) => {
    setRoomData({
      ...roomData,
      [key]: value,
    });
  };

  useEffect(() => {
    if (room) {
      setRoomData(room);
    }
  }, [room]);

  const onUpdate = () => {
    mutate(roomData);
  };

  const goToAddEditBookingScreen = () =>
    navigate('BottomTabs', {
      screen: 'BookingHistoryStack',
      params: {
        screen: 'BookingHistoryAddBooking',
        initial: false,
        params: {
          isEditMode: false,
        },
      },
    });

  const onCheckInOrOutBooking = () => {
    let action = null;
    if (room.status === RoomStatus.BOOKED || room.status === RoomStatus.AVAILABLE) {
      action = 'Check In';
    }
    if (room.status === RoomStatus.INHABITED) {
      action = 'Check Out';
    }
    PopUp.show({
      title: `Are you sure you want to ${action} this booking?`,
      type: 'confirm',
      textBody: 'You cannot undo this action!',
    });
    if (room.status === RoomStatus.BOOKED || room.status === RoomStatus.AVAILABLE) {
      checkInMutate({
        bookingId: currentBooking?.id,
      });
      //handle check in here
    }
    if (room.status === RoomStatus.INHABITED) {
      //handle check out here
      checkOutMutate({
        bookingId: currentBooking?.id,
      });
    }
  };

  return (
    <BottomDrawer onDrawerStateChange={onDrawerStateChange}>
      <View>
        <ScrollView style={[styles.Container, { height: '68%' }]}>
          <View style={styles.row}>
            <Text category="h5">Room {room.name}</Text>
            <Button
              style={{
                width: 80,
                marginLeft: 'auto',
                paddingLeft: 0,
                paddingRight: 0,
                padding: 0,
              }}
              onPress={onUpdate}
              disabled={isLoading}
            >
              Update
            </Button>
          </View>

          <Divider style={{ marginTop: 6, marginBottom: 12 }} />
          <Input
            value={roomData.name}
            label="Room Name"
            placeholder="Place your Text"
            onChangeText={(nextValue) => updateRoomData('name', nextValue)}
            style={styles.input}
          />
          <Select
            label="Room Status"
            style={styles.input}
            items={statusData}
            selectedValue={roomData.status}
            onChangeValue={(value) => updateRoomData('status', (value as any).value)}
            disabled={
              roomData.status === RoomStatus.BOOKED || roomData.status === RoomStatus.INHABITED
            }
          />
          <Input
            value={roomData.description}
            label="Description"
            placeholder="Place your Text"
            onChangeText={(nextValue) => updateRoomData('description', nextValue)}
            style={styles.input}
          />

          <Text category="p1" style={styles.textHint}>
            <Text style={{ fontWeight: 'bold', color: 'grey' }}>Baseline price:</Text>&nbsp;
            {formatCurrency(room?.baselinePrice || 0)}
          </Text>
          <Text category="p1" style={styles.textHint}>
            <Text style={{ fontWeight: 'bold', color: 'grey' }}>Max People:</Text>&nbsp;{' '}
            {room?.maxPeople}
          </Text>
          <Text category="p1" style={styles.textHint}>
            <Text style={{ fontWeight: 'bold', color: 'grey' }}>Notes:</Text>&nbsp; {room?.notes}
          </Text>

          <Divider style={{ marginTop: 12, marginBottom: 12 }} />

          <Text category="h6" style={{ marginBottom: 12 }}>
            Current Booking
          </Text>
          {!!currentBooking && (
            <>
              <BookingCard booking={currentBooking} />
              <Button
                style={{
                  marginTop: 12,
                  marginBottom: 40,
                }}
                onPress={onCheckInOrOutBooking}
                disabled={isLoading}
              >
                {room.status === RoomStatus.BOOKED ? 'Check In' : 'Check Out'}
              </Button>

              {/* <Button
                onPress={goToAddEditBookingScreen}
                appearance="outline"
                style={{ marginTop: 24 }}
              >
                Borrow Item
              </Button>

              <Button
                onPress={goToAddEditBookingScreen}
                appearance="outline"
                style={{ marginTop: 24 }}
              >
                Order Food
              </Button> */}
            </>
          )}
          {!currentBooking && (
            <>
              <Text style={{ color: 'grey' }}>No Booking on this room, yet!</Text>

              <Button
                onPress={goToAddEditBookingScreen}
                appearance="outline"
                style={{ marginTop: 24 }}
              >
                Add New Booking
              </Button>
            </>
          )}
        </ScrollView>
      </View>
    </BottomDrawer>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    // marginLeft: 'auto',
    // width: 330,
    // marginRight: 'auto',
    paddingTop: 12,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    marginBottom: 12,
  },
  textHint: {
    marginBottom: 2,
  },
});

export default memo(RoomDetailBottomDrawer);
