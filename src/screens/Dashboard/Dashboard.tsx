import * as React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import SummaryCard from './SummaryCard';
import Notifications from './Notifications';
import FloorPlan from 'components/FloorPlan';

// hi, [avail rooom] [notif], room booking (+ create, update), booking summary
// finance: add cost, see income, statistic
// search booking history (cancel, update)
function HomeScreen() {
  return (
    <ScrollView style={styles.Container}>
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
  );
}

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
