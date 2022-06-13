import * as React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

// hi, [avail rooom] [notif], room booking (+ create, update), booking summary
// finance: add cost, see income, statistic
// search booking history (cancel, update)
function BookingHistoryScreen() {
  return (
    <ScrollView style={styles.Container}>
      <Text>BOOKING History</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    background: 'white',
  },
});

export default BookingHistoryScreen;
