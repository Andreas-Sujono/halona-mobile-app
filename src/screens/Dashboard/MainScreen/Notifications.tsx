import * as React from 'react';
import { Card, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

function Notifications() {
  return (
    <Layout style={styles.container}>
      <Card style={[styles.card, { flex: 1 }]}>
        <Text style={styles.cardTitle}>Notifications</Text>
        <Text category="p1" style={styles.cardValue}>
          - A new book has been made to room 101
        </Text>
        <Text category="p1" style={styles.cardValue}>
          - A new book has been made to room 101
        </Text>
        <Text category="p1" style={styles.cardValue}>
          - A new book has been made to room 101
        </Text>
        <Text category="p1" style={styles.cardValue}>
          - A new book has been made to room 101
        </Text>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxHeight: 200,
    background: 'white',
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
    margin: 16,
    marginTop: 16,
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    padding: 0,
  },
  cardTitle: {
    color: 'grey',
  },
  cardValue: {
    marginTop: 8,
  },
});

export default Notifications;
