/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Divider, IndexPath, Input, Text } from '@ui-kitten/components';
import BookingCard from 'components/BookingCard';
import BottomDrawer from 'components/PopUp/BottomDrawer';
import { DrawerState } from 'components/PopUp/BottomDrawer/BottomDrawer';
import Select from 'components/Select';
import { useUpdateRoom } from 'hooks/api/booking/useRoomData';
import { Room, RoomStatus } from 'model';
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
];

function RoomDetailBottomDrawer({ room, onClose }: { room: Room; onClose: () => void }) {
  const [roomData, setRoomData] = useState(room);
  const [selectedIndex, setSelectedIndex] = React.useState<any>(new IndexPath(0));
  const { mutate, isLoading } = useUpdateRoom(room.id);

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

  const onCheckInOrOutBooking = () => {
    if (room.status === RoomStatus.BOOKED || room.status === RoomStatus.AVAILABLE) {
      //handle check in here
    }
    if (room.status === RoomStatus.INHABITED) {
      //handle check out here
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
          {!!room?.currentBooking && (
            <>
              <BookingCard booking={room.currentBooking} />
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
            </>
          )}
          {!room?.currentBooking && (
            <Text style={{ color: 'grey' }}>No Booking on this room, yet!</Text>
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
