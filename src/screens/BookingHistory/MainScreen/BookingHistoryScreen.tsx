import BookingCard from 'components/BookingCard';
import SearchBar from 'components/SearchBar';
import {
  useAllBookingsData,
  useFutureBookingData,
  usePendingRoomBookingData,
  useTodayBookingData,
} from 'hooks/api/booking/useBookingData';
import { QUERY_KEY } from 'hooks/api/queryKeys';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Button,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useQueryClient } from 'react-query';

export const FILTER: any = {
  ALL: 'All',
  TODAY: 'Today',
  PENDING_ROOMS: 'No Rooms',
  FUTURE: 'Future',
};

function BookingHistoryScreen() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('ALL'); //ALL, PENDING_ROOM, FUTURE

  const { data, isLoading, hasNextPage, fetchNextPage } = useAllBookingsData();
  const { data: pendingBookingsData } = usePendingRoomBookingData();
  const { data: futureBookingData } = useFutureBookingData();
  const { data: todayBookingData } = useTodayBookingData();

  const queryClient = useQueryClient();

  // const [data, setData] = useState({
  //   data: mockBookingData,
  //   moreLoading: false,
  //   isListEnd: true,
  // });

  const fetchMoreData = () => {
    if (hasNextPage && !isLoading) {
      setPage(page + 1);
      fetchNextPage();
    }
  };

  const renderFooter = () => (
    <View style={styles.footerText}>
      {isLoading && <ActivityIndicator />}
      {!hasNextPage && <Text>No more booking at the moment</Text>}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
      <Button onPress={() => null} title="Refresh" />
    </View>
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (filter === 'ALL') {
      queryClient.invalidateQueries(QUERY_KEY.BOOKINGS);
    }
    if (filter === 'TODAY') {
      queryClient.invalidateQueries(QUERY_KEY.TODAY_BOOKINGS);
    }
    if (filter === 'PENDING_ROOMS') {
      queryClient.invalidateQueries(QUERY_KEY.PENDING_ROOM_BOOKINGS);
    }
    if (filter === 'FUTURE') {
      queryClient.invalidateQueries(QUERY_KEY.FUTURE_BOOKINGS);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRefreshing(false);
  }, [queryClient, filter]);

  const allData = data?.pages?.reduce((acc, curr) => [...acc, ...curr.data], []) || [];

  let chosenData = allData;
  if (filter === 'PENDING_ROOMS') {
    chosenData = pendingBookingsData;
  }
  if (filter === 'FUTURE') {
    chosenData = futureBookingData;
  }
  if (filter === 'TODAY') {
    chosenData = todayBookingData;
  }

  return (
    <View style={styles.container}>
      <SearchBar value={searchValue} onChangeText={(text) => setSearchValue(text)} />
      <View style={styles.buttonContainer}>
        {Object.keys(FILTER).map((key: any) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.button,
              {
                borderBottomColor: key === filter ? '#0d43ee' : 'white',
                borderBottomWidth: 3,
              },
            ]}
            onPress={() => setFilter(key)}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: key === filter ? '#0d43ee' : 'grey',
                },
              ]}
            >
              {FILTER[key]}
            </Text>
            <Text style={styles.buttonBagde}>
              {key === 'ALL'
                ? allData.length
                : key === 'TODAY'
                ? todayBookingData.length
                : key === 'PENDING_ROOMS'
                ? pendingBookingsData.length
                : key === 'FUTURE'
                ? futureBookingData.length
                : allData.length}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
        data={chosenData}
        renderItem={({ item }) => <BookingCard booking={item} />}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    backgroundColor: 'white',
    padding: 8,
  },
  button: {
    minWidth: 50,
    height: 32,
    marginRight: 24,
    backgroundColor: 'white',
    border: 0,
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  buttonBagde: {
    color: 'grey',
    position: 'absolute',
    top: 0,
    right: -8,
  },
});

export default BookingHistoryScreen;
