import BookingCard from 'components/BookingCard';
import SearchBar from 'components/SearchBar';
import { BookingStatus, BookingType } from 'model';
import React, { useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, Button, FlatList } from 'react-native';

const mockBookingData = Array.from({ length: 20 }).map((item, idx) => ({
  id: idx.toString(),
  guestName: 'Andreas Sujono test',
  rooms: [],
  price: 180000,
  status: BookingStatus.PAID,
  type: BookingType.ONLINE,
}));

function BookingHistoryScreen() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    data: mockBookingData,
    moreLoading: false,
    isListEnd: true,
  });

  const fetchMoreData = () => {
    if (!data.isListEnd && !data.moreLoading) {
      setPage(page + 1);
    }
  };

  const renderFooter = () => (
    <View style={styles.footerText}>
      {data.moreLoading && <ActivityIndicator />}
      {data.isListEnd && <Text>No more booking at the moment</Text>}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
      <Button onPress={() => null} title="Refresh" />
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar value={searchValue} onChangeText={(text) => setSearchValue(text)} />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data.data}
        renderItem={({ item }) => <BookingCard booking={item} />}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
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
