/* eslint-disable react-native/no-inline-styles */
import React, { memo, useContext, useState } from 'react';
import { Layout, Text, Divider, Button } from '@ui-kitten/components';
import { Image, StyleSheet, View, Text as NativeText } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RoomDetailDrawerContext } from 'Context/useRoomDetailBottomDrawerContext';

export enum RoomStatus {
  NOT_AVAILABLE = 0,
  AVAILABLE = 1,
  BOOKED = 2,
  INHABITED = 3,
  GUEST_OUT_NEED_CLEAN = 4,
  NEED_CLEAN = 5,
}

export const mapStatusToInfo = {
  [RoomStatus.NOT_AVAILABLE]: {
    color: 'black',
    infoName: 'Not Available',
  },
  [RoomStatus.AVAILABLE]: {
    color: 'white',
    infoName: 'Available',
  },
  [RoomStatus.BOOKED]: {
    color: 'yellow',
    infoName: 'Booked',
  },
  [RoomStatus.INHABITED]: {
    color: 'green',
    infoName: 'Inhabited',
  },
  [RoomStatus.GUEST_OUT_NEED_CLEAN]: {
    color: 'red',
    infoName: 'Need to be clean',
  },
  [RoomStatus.NEED_CLEAN]: {
    color: 'red',
    infoName: 'Need to be clean',
  },
};

//rooms start from top left to top right to bottom right
const floorPlanData = [
  {
    id: 1,
    floorName: 'Lv1',
    rooms: [
      {
        id: 1,
        name: '101',
        status: RoomStatus.AVAILABLE,
        currentGuest: null,
      },
      {
        id: 2,
        name: '102',
        status: RoomStatus.BOOKED,
        currentGuest: null,
      },
      {
        id: 3,
        name: '103',
        status: RoomStatus.BOOKED,
        currentGuest: null,
      },
      {
        id: 4,
        name: '104',
        status: RoomStatus.BOOKED,
        currentGuest: null,
      },
      {
        id: 5,
        name: '105',
        status: RoomStatus.BOOKED,
        currentGuest: null,
      },
    ],
  },
  {
    id: 2,
    floorName: 'Lv2',
    rooms: [
      {
        id: 1,
        name: '201',
        status: RoomStatus.NEED_CLEAN,
        currentGuest: null,
      },
      {
        id: 2,
        name: '202',
        status: RoomStatus.NOT_AVAILABLE,
        currentGuest: null,
      },
      {
        id: 3,
        name: '203',
        status: RoomStatus.AVAILABLE,
        currentGuest: null,
      },
      {
        id: 4,
        name: '204',
        status: RoomStatus.AVAILABLE,
        currentGuest: null,
      },
      {
        id: 5,
        name: '205',
        status: RoomStatus.AVAILABLE,
        currentGuest: null,
      },
      {
        id: 6,
        name: '206',
        status: RoomStatus.AVAILABLE,
        currentGuest: null,
      },
      {
        id: 7,
        name: '207',
        status: RoomStatus.AVAILABLE,
        currentGuest: null,
      },
    ],
  },
  {
    id: 3,
    floorName: 'Lv3',
    rooms: [
      {
        id: 1,
        name: '101',
        status: RoomStatus.AVAILABLE,
        currentGuest: null,
      },
      {
        id: 2,
        name: '102',
        status: RoomStatus.AVAILABLE,
        currentGuest: null,
      },
      {
        id: 3,
        name: '103',
        status: RoomStatus.AVAILABLE,
        currentGuest: null,
      },
    ],
  },
];

function FloorPlan() {
  const [currentFloorId, setCurrentFloorId] = useState(floorPlanData[0].id);

  const chosenRooms = floorPlanData.find((item) => item.id === currentFloorId)?.rooms || [];
  const roomDetailDrawerContext = useContext(RoomDetailDrawerContext);

  const onClickRoom = (room: any) => {
    roomDetailDrawerContext.setRoom(room);
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.buttonContainer}>
        {floorPlanData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.button,
              {
                borderBottomColor: item.id === currentFloorId ? '#0d43ee' : 'white',
                borderBottomWidth: 3,
              },
            ]}
            onPress={() => setCurrentFloorId(item.id)}
          >
            <NativeText
              style={[
                styles.buttonText,
                {
                  color: item.id === currentFloorId ? '#0d43ee' : 'grey',
                },
              ]}
            >
              {item.floorName}
            </NativeText>
          </TouchableOpacity>
        ))}
        <Button
          style={{
            width: 100,
            marginLeft: 'auto',
            paddingLeft: 0,
            paddingRight: 0,
            padding: 0,
          }}
        >
          + Booking
        </Button>
      </View>

      <Divider style={{ margin: 8 }} />

      <View style={styles.roomsContainer}>
        <View style={styles.topRooms}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {
              //render top line
              chosenRooms.slice(0, 2).map((room) => (
                <TouchableOpacity
                  key={room.id}
                  style={[
                    styles.topRoom,
                    styles.room,
                    { backgroundColor: mapStatusToInfo[room.status].color },
                  ]}
                  onPress={() => onClickRoom(room)}
                >
                  <Text>{room.name}</Text>
                </TouchableOpacity>
              ))
            }
            <Image
              source={{
                uri: 'https://image.shutterstock.com/image-illustration/stairs-260nw-114819274.jpg',
                width: 50,
                height: 60,
              }}
              style={{
                marginRight: 16,
              }}
            />
          </View>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/photos/road-with-brick-pattern-in-a-half-circle-picture-id1018704240',
              width: 220,
              height: (chosenRooms.length - 2) * 60,
            }}
            style={{
              marginBottom: 16,
              opacity: 0.1,
            }}
          />
        </View>

        <View style={styles.rightRooms}>
          {
            //render right line
            chosenRooms.slice(2).map((room) => (
              <TouchableOpacity
                key={room.id}
                style={[
                  styles.rightRoom,
                  styles.room,
                  { backgroundColor: mapStatusToInfo[room.status].color },
                ]}
                onPress={() => onClickRoom(room)}
              >
                <Text>{room.name}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>

      <View>
        {Object.entries(mapStatusToInfo).map(([key, info]) => (
          <View key={key} style={styles.badgeContainer}>
            <View style={[styles.badgeInfo, { backgroundColor: info.color }]} />
            <Text appearance="hint" category="p2">
              &nbsp;{info.infoName}
            </Text>
          </View>
        ))}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    background: 'white',
    marginTop: 0,
    padding: 16,
    minHeight: '50%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 70,
    height: 32,
    marginRight: 6,
    backgroundColor: 'white',
    border: 0,
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  roomsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
  },
  topRooms: {
    flexDirection: 'column',
    display: 'flex',
  },
  room: {
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'lightgrey',
    padding: 0,
  },
  topRoom: {
    marginRight: 18,
  },
  rightRooms: {
    flexDirection: 'column',
    display: 'flex',
    marginTop: 24,
  },
  rightRoom: {
    marginBottom: 18,
  },
  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
    flexDirection: 'row',
  },
  badgeInfo: {
    width: 20,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    borderColor: '#f0f0f0',
    borderWidth: 1,
  },
});

export default memo(FloorPlan);
