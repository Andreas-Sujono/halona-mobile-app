import * as React from 'react';
import { Card, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useRoomSummaryData } from 'hooks/api/booking/useRoomData';
import { useFinanceSummaryThisMonthData } from 'hooks/api/finance/useFinanceRecordsData';
import { formatCurrency } from 'utils';

function SummaryCard() {
  const { data: roomSummaryData } = useRoomSummaryData();
  const { data: financeSummaryThisMonthData } = useFinanceSummaryThisMonthData();

  return (
    <Layout style={styles.container}>
      <Card style={[styles.card, { marginRight: 8, flex: 1, maxWidth: '40%' }]}>
        <Text style={styles.cardTitle}>Rooms</Text>
        <Text category="h5" style={styles.cardValue}>
          {roomSummaryData?.availableRoomsCount || 0} / {roomSummaryData?.allRoomsCount || 0}
        </Text>
      </Card>
      <Card style={[styles.card, { flex: 1 }]}>
        <Text style={styles.cardTitle}>Net Income</Text>
        <Text category="h6" style={styles.cardValue}>
          {formatCurrency(
            financeSummaryThisMonthData?.totalIncome - financeSummaryThisMonthData?.totalCost
          )}
        </Text>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    margin: 16,
    marginTop: 0,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    padding: 0,
    backgroundColor: 'white',
  },
  cardTitle: {
    color: 'grey',
  },
  cardValue: {
    marginTop: 8,
  },
});

export default SummaryCard;
