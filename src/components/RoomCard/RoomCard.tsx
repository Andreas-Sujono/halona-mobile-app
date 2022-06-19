import { Card, Text } from '@ui-kitten/components';
import { BookingStatus, Room, RoomStatus } from 'model';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { formatDate } from 'utils';
import { mapBookingStatusToInfo } from '../BookingCard/BookingCard';

export const mapStatusToInfo = {
  [RoomStatus.NOT_AVAILABLE]: {
    color: 'grey',
    infoName: 'Not Available',
  },
  [RoomStatus.AVAILABLE]: {
    color: 'green',
    infoName: 'Available',
  },
  [RoomStatus.BOOKED]: {
    color: 'orange',
    infoName: 'Booked',
  },
  [RoomStatus.INHABITED]: {
    color: 'orange',
    infoName: 'Inhabited',
  },
  [RoomStatus.GUEST_OUT_AND_NEED_TO_BE_CLEANED]: {
    color: 'red',
    infoName: 'Need to be clean',
  },
  [RoomStatus.ROOM_NEED_TO_BE_CLEANED]: {
    color: 'red',
    infoName: 'Need to be clean',
  },
};

function RoomCard({ room, onClick }: { room: Partial<Room>; onClick: any }) {
  const roomstatusInfo = mapStatusToInfo[room.status!];
  const bookingStatusInfo =
    mapBookingStatusToInfo[room.currentBooking?.status || BookingStatus.VOID];
  return (
    <Card style={styles.Container} onPress={onClick}>
      <Text
        category="p1"
        style={{
          fontWeight: 'bold',
        }}
      >
        Room {room?.name || ''} -{' '}
        <Text style={{ color: roomstatusInfo.color }} category="p1">
          {roomstatusInfo.infoName || 'NOOO'}
        </Text>
      </Text>

      {room.currentBooking && (
        <>
          <View style={[styles.InputContainer, { marginTop: 12 }]}>
            <Text style={styles.label}>Guest Name :</Text>
            <Text style={styles.inputValue}>{room.currentBooking.guestName}</Text>
          </View>

          <View style={[styles.InputContainer]}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.inputValue}>
              {formatDate(room.currentBooking.bookingStartDate)} -{' '}
              {formatDate(room.currentBooking.bookingEndDate)}
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
        </>
      )}
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

export default memo(RoomCard);
