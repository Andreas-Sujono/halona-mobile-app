import React, { useContext, useState } from 'react';
import { Datepicker, Layout, Toggle } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import SummaryCard from './SummaryCard';
// import Notifications from './Notifications';
import FloorPlan from 'components/FloorPlan';
import { RoomDetailDrawerContext } from 'Context/useRoomDetailBottomDrawerContext';
import RoomDetailBottomDrawer from 'components/FloorPlan/RoomDetailBottomDrawer';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from 'hooks/api/queryKeys';
import { useAppDispatch, useAppSelector } from 'Store';
import { selectMainBookingDateView, selectUseFloorPlanView } from 'Store/Selector/booking';
import { setMainBookingDateView, setUseFloorPlanView } from 'Store/Actions/booking/general';
import PendingRoomSection from './PendingRoomSection';
import { useTranslation } from 'react-i18next';
import { selectUser } from 'Store/Selector/auth';
import { Page, Text, View } from 'components/Native';

// hi, [avail rooom] [notif], room booking (+ create, update), booking summary
// finance: add cost, see income, statistic
// search booking history (cancel, update)
function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const roomDetailContext = useContext(RoomDetailDrawerContext);
  const mainBookingDateView = useAppSelector(selectMainBookingDateView);
  const useFloorPlanView = useAppSelector(selectUseFloorPlanView);
  const { t } = useTranslation();
  const me = useAppSelector(selectUser);

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
    queryClient.invalidateQueries(QUERY_KEY.PENDING_ROOM_BOOKINGS);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRefreshing(false);
  }, [queryClient, mainBookingDateView]);

  const onSelectDateView = (date: Date) => {
    dispatch(setMainBookingDateView(date));
    setTimeout(onRefresh, 1);
  };

  const onSelectFloorPlanView = (value: boolean) => {
    dispatch(setUseFloorPlanView(value));
  };

  return (
    <>
      <Page
        style={styles.Container}
        onTouchStart={onClickHomeDashboard}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        enableScroll
        bgColor="secondary"
      >
        <SafeAreaView style={styles.Container}>
          <View style={styles.topContainer} bgColor="secondary">
            <Text category="h6" style={styles.welcomeTitleText} fontSize={20} color="textSecondary">
              {t('dashboard.welcome', { name: me?.fullName })}
            </Text>
            <Text category="h3" style={styles.subtitleText} fontSize={28}>
              {t('dashboard.manage_booking')}
            </Text>

            <View style={styles.mainForm} bgColor="secondary">
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
                <Text fontSize={14}>Use floor plan view</Text>
              </Toggle>
            </View>
          </View>
          <SummaryCard />
          <FloorPlan />
          <PendingRoomSection />
          {/* <Notifications /> */}
        </SafeAreaView>
      </Page>
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
  },
  topContainer: {
    padding: 24,
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
