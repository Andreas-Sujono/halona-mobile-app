import * as React from 'react';
import { Card, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

function SummaryCard() {
  return (
    <Layout style={styles.container}>
      <Card style={[styles.card, { flex: 1 }]}>
        <Text style={styles.cardTitle}>Income</Text>
        <Text category="h5" style={styles.cardValue}>
          + Rp10,000,000
        </Text>
      </Card>
      <Card style={[styles.card, { flex: 1 }]}>
        <Text style={styles.cardTitle}>Cost</Text>
        <Text category="h5" style={styles.cardValue}>
          - Rp2,000,000
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
