import BookingCard from 'components/BookingCard';
import SearchBar from 'components/SearchBar';
import { useAllBookingsData } from 'hooks/api/booking/useBookingData';
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
} from 'react-native';
import { useQueryClient } from 'react-query';

// const mockBookingData = Array.from({ length: 20 }).map((item, idx) => ({
//   id: idx.toString(),
//   guestName: 'Andreas Sujono test',
//   rooms: [],
//   price: 180000,
//   status: BookingStatus.PAID,
//   type: BookingType.ONLINE,
// }));

function BookingHistoryScreen() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading, hasNextPage, fetchNextPage } = useAllBookingsData();
  const [refreshing, setRefreshing] = useState(false);

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
    queryClient.invalidateQueries(QUERY_KEY.BOOKINGS);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRefreshing(false);
  }, [queryClient]);

  const allData = data?.pages?.reduce((acc, curr) => [...acc, ...curr.data], []) || [];

  return (
    <View style={styles.container}>
      <SearchBar value={searchValue} onChangeText={(text) => setSearchValue(text)} />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={allData}
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
});

export default BookingHistoryScreen;
