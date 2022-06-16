import * as React from 'react';
import { Card, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { formatCurrency, getCurrentMonth } from 'utils';
import { useFinanceSummaryThisMonthData } from 'hooks/api/finance/useFinanceRecordsData';

function SummaryCard() {
  const { data: financeSummaryThisMonthData } = useFinanceSummaryThisMonthData();

  return (
    <Layout style={styles.container}>
      <Card style={[styles.card, { flex: 1 }]}>
        <Text style={styles.cardTitle}>Income in {getCurrentMonth()}</Text>
        <Text
          category="h5"
          style={[
            styles.cardValue,
            {
              color: 'green',
            },
          ]}
        >
          + {formatCurrency(financeSummaryThisMonthData?.totalIncome)}
        </Text>
      </Card>
      <Card style={[styles.card, { flex: 1 }]}>
        <Text style={styles.cardTitle}>Cost in {getCurrentMonth()}</Text>
        <Text
          category="h5"
          style={[
            styles.cardValue,
            {
              color: 'red',
            },
          ]}
        >
          - {formatCurrency(financeSummaryThisMonthData?.totalCost)}
        </Text>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 0,
    flexDirection: 'column',
    backgroundColor: 'transparent',
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
