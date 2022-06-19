import React, { useContext, useState } from 'react';
import { Datepicker, Layout, Text, Toggle } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, ScrollView, RefreshControl, View } from 'react-native';
import SummaryCard from './SummaryCard';
import Notifications from './Notifications';
import FloorPlan from 'components/FloorPlan';
import { RoomDetailDrawerContext } from 'Context/useRoomDetailBottomDrawerContext';
import RoomDetailBottomDrawer from 'components/FloorPlan/RoomDetailBottomDrawer';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from 'hooks/api/queryKeys';
import { useAppDispatch, useAppSelector } from 'Store';
import { selectMainBookingDateView, selectUseFloorPlanView } from 'Store/Selector/booking';
import { setMainBookingDateView, setUseFloorPlanView } from 'Store/Actions/booking/general';

// hi, [avail rooom] [notif], room booking (+ create, update), booking summary
// finance: add cost, see income, statistic
// search booking history (cancel, update)
function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const roomDetailContext = useContext(RoomDetailDrawerContext);
  const mainBookingDateView = useAppSelector(selectMainBookingDateView);
  const useFloorPlanView = useAppSelector(selectUseFloorPlanView);

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const onClickHomeDashboard = () => {
    //closed drawer
    if (roomDetailContext.isOpen) {
      roomDetailContext.setRoom(null);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    queryClient.invalidateQueries([QUERY_KEY.ROOMS_FLOOR_PLAN, mainBookingDateView]);
    queryClient.invalidateQueries(QUERY_KEY.FINANCE_SUMMARY_THIS_MONTH);
    queryClient.invalidateQueries([QUERY_KEY.ROOM_SUMMARY, mainBookingDateView]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRefreshing(false);
  }, [queryClient, mainBookingDateView]);

  const onSelectDateView = (date: Date) => {
    dispatch(setMainBookingDateView(date));
    setTimeout(onRefresh, 10);
  };

  const onSelectFloorPlanView = (value: boolean) => {
    dispatch(setUseFloorPlanView(value));
  };

  return (
    <>
      <ScrollView
        style={styles.Container}
        onTouchStart={onClickHomeDashboard}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <SafeAreaView style={styles.Container}>
          <Layout style={styles.topContainer}>
            <Text category="h6" style={styles.welcomeTitleText}>
              Hi Andreas Sujono!
            </Text>
            <Text category="h3" style={styles.subtitleText}>
              Manage Book
            </Text>

            <View style={styles.mainForm}>
              <Datepicker
                label="See booking date"
                date={new Date(mainBookingDateView)}
                onSelect={onSelectDateView}
              />
              <Toggle
                style={styles.toggle}
                checked={useFloorPlanView}
                onChange={onSelectFloorPlanView}
              >
                Use floor plan view
              </Toggle>
            </View>
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
  mainForm: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggle: {
    marginLeft: 4,
  },
});

export default HomeScreen;
