/* eslint-disable react-native/no-inline-styles */
import React, { memo, useContext, useState } from 'react';
import { Layout, Text, Divider, Button } from '@ui-kitten/components';
import { Image, StyleSheet, View, Text as NativeText, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RoomDetailDrawerContext } from 'Context/useRoomDetailBottomDrawerContext';
import { navigate } from 'navigators/utils';
import { useFloorPlanData } from 'hooks/api/booking/useRoomData';
import { Room, RoomStatus } from 'model';

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
  [RoomStatus.GUEST_OUT_AND_NEED_TO_BE_CLEANED]: {
    color: 'red',
    infoName: 'Need to be clean',
  },
  [RoomStatus.ROOM_NEED_TO_BE_CLEANED]: {
    color: 'red',
    infoName: 'Need to be clean',
  },
};

function FloorPlan() {
  const { data: allRooms, isLoading } = useFloorPlanData();
  const [currentFloorId, setCurrentFloorId] = useState(0);

  const chosenRooms = allRooms?.find((item: any) => item.id === currentFloorId)?.rooms || [];

  const roomDetailDrawerContext = useContext(RoomDetailDrawerContext);

  // console.log('allRooms: ', allRooms);

  const onClickRoom = (room: any) => {
    roomDetailDrawerContext.setRoom(room);
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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.buttonContainer}>
        {allRooms.map((item: any) => (
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
          onPress={goToAddEditBookingScreen}
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
              chosenRooms.slice(0, 2).map((room: Room) => (
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
            chosenRooms.slice(2).map((room: Room) => (
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
