import { Text } from '@ui-kitten/components';
import React, { memo } from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import SummaryCard from './SummaryCard';

// hi, [avail rooom] [notif], room booking (+ create, update), booking summary
// finance: add cost, see income, statistic
// search booking history (cancel, update)
function FinanceMainScreen() {
  return (
    <ScrollView style={styles.Container}>
      <SummaryCard />
      <View style={styles.NavContainer}>
        <TouchableOpacity style={styles.Card}>
          <Image source={require('../../../assets/saving.png')} style={styles.cardIcon} />
          <Text style={styles.cardText}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Card}>
          <Image source={require('../../../assets/finance.png')} style={styles.cardIcon} />
          <Text style={styles.cardText}>Cost</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    background: 'white',
  },
  NavContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Card: {
    flex: 1,
    backgroundColor: 'white',
    minHeight: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  cardIcon: {
    width: 60,
    height: 60,
  },
  cardText: {
    fontWeight: '400',
    fontSize: 16,
    marginTop: 8,
  },
});

export default memo(FinanceMainScreen);
