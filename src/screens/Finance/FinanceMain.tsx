import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import SummaryCard from './SummaryCard';

// hi, [avail rooom] [notif], room booking (+ create, update), booking summary
// finance: add cost, see income, statistic
// search booking history (cancel, update)
function FinanceMainScreen() {
  return (
    <ScrollView style={styles.Container}>
      <SummaryCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    background: 'white',
  },
});

export default FinanceMainScreen;
