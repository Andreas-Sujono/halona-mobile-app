import { Button, Divider, IndexPath, Input, Select, SelectItem, Text } from '@ui-kitten/components';
import BookingCard from 'components/BookingCard';
import BottomDrawer from 'components/BottomDrawer';
import { DrawerState } from 'components/BottomDrawer/BottomDrawer';
import { Booking, BookingStatus, BookingType, Room, RoomStatus } from 'model';
import React, { memo } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { formatCurrency } from 'utils';

const statusData = [
  {
    label: 'Not Available',
    value: RoomStatus.NOT_AVAILABLE,
  },
  {
    label: 'Available',
    value: RoomStatus.AVAILABLE,
  },
  {
    label: 'Need to be cleaned',
    value: RoomStatus.ROOM_NEED_TO_BE_CLEANED,
  },
];

function RoomDetailBottomDrawer({ room, onClose }: { room: Room; onClose: () => void }) {
  const [selectedIndex, setSelectedIndex] = React.useState<any>(new IndexPath(0));

  const onDrawerStateChange = (state: DrawerState) => {
    if (state === DrawerState.CLOSED) {
      onClose();
    }
  };

  const displayStatusValue = statusData[selectedIndex.row].label;

  const currentBooking: Booking = {
    id: '1020102',
    guestName: 'Andreas Sujono test',
    rooms: [],
    price: 180000,
    status: BookingStatus.PAID,
    type: BookingType.ONLINE,
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
            >
              Update
            </Button>
          </View>

          <Divider style={{ marginTop: 6, marginBottom: 12 }} />
          <Input
            value={''}
            label="Room Name"
            placeholder="Place your Text"
            onChangeText={(nextValue) => console.log(nextValue)}
            style={styles.input}
          />
          <Select
            label="Status"
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
            style={styles.input}
            value={displayStatusValue}
          >
            {statusData.map((item) => (
              <SelectItem title={item.label} key={item.value} />
            ))}
          </Select>
          <Input
            value={''}
            label="Description"
            placeholder="Place your Text"
            onChangeText={(nextValue) => console.log(nextValue)}
            style={styles.input}
          />

          <Text category="p1" style={styles.textHint}>
            <Text style={{ fontWeight: 'bold', color: 'grey' }}>Baseline price:</Text>&nbsp;
            {formatCurrency(150000)}
          </Text>
          <Text category="p1" style={styles.textHint}>
            <Text style={{ fontWeight: 'bold', color: 'grey' }}>Max People:</Text>&nbsp; 2
          </Text>
          <Text category="p1" style={styles.textHint}>
            <Text style={{ fontWeight: 'bold', color: 'grey' }}>Notes:</Text>&nbsp;
          </Text>

          <Divider style={{ marginTop: 12, marginBottom: 12 }} />

          <Text category="h6" style={{ marginBottom: 12 }}>
            Current Booking
          </Text>
          {!!currentBooking && <BookingCard booking={currentBooking} />}
        </ScrollView>
      </View>
    </BottomDrawer>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    width: 330,
    marginLeft: 'auto',
    marginRight: 'auto',
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
