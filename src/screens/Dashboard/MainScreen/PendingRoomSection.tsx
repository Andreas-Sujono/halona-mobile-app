import React, { memo } from 'react';
import { Card, Layout, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { usePendingRoomBookingData } from 'hooks/api/booking/useBookingData';
import BookingCard from 'components/BookingCard';
import { COLORS } from 'utils/colors';

function SummaryCard() {
  const { data } = usePendingRoomBookingData();
  const bookings = (data || []).slice(0, 5);
  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.cardTitle} category="h6">
          Pending bookings without room
        </Text>
        <View style={styles.cardValue}>
          {bookings.map((item: any) => (
            <BookingCard booking={item} key={item.id} />
          ))}
        </View>
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
    marginTop: 12,
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
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
    color: COLORS.TEXT_CTA,
  },
  cardValue: {
    marginTop: 8,
  },
});

export default memo(SummaryCard);
