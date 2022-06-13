import React, { useContext } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import SummaryCard from './SummaryCard';
import Notifications from './Notifications';
import FloorPlan from 'components/FloorPlan';
import { RoomDetailDrawerContext } from 'Context/useRoomDetailBottomDrawerContext';
import RoomDetailBottomDrawer from 'components/FloorPlan/RoomDetailBottomDrawer';

// hi, [avail rooom] [notif], room booking (+ create, update), booking summary
// finance: add cost, see income, statistic
// search booking history (cancel, update)
function HomeScreen() {
  const roomDetailContext = useContext(RoomDetailDrawerContext);

  const onClickHomeDashboard = () => {
    //closed drawer
    if (roomDetailContext.isOpen) {
      roomDetailContext.setRoom(null);
    }
  };

  return (
    <>
      <ScrollView style={styles.Container} onTouchStart={onClickHomeDashboard}>
        <SafeAreaView style={styles.Container}>
          <Layout style={styles.topContainer}>
            <Text category="h6" style={styles.welcomeTitleText}>
              Hi Andreas Sujono!
            </Text>
            <Text category="h3" style={styles.subtitleText}>
              Manage Book
            </Text>
          </Layout>
          <SummaryCard />
          <FloorPlan />
          <Notifications />
        </SafeAreaView>
      </ScrollView>
      <RoomDetailDrawerRender />
    </>
  );
}

const RoomDetailDrawerRender = () => {
  const roomDetailContext = useContext(RoomDetailDrawerContext);

  if (roomDetailContext.isOpen) {
    return (
      <RoomDetailBottomDrawer
        room={roomDetailContext.room as any}
        onClose={() => roomDetailContext.setRoom(null)}
      />
    );
  }

  return null;
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    background: 'white',
  },
  topContainer: {
    padding: 24,
    backgroundColor: 'white',
    margin: 0,
  },
  welcomeTitleText: {
    fontWeight: '400',
    color: 'grey',
    marginTop: 18,
  },
  subtitleText: {
    marginTop: 8,
  },
});

export default HomeScreen;
