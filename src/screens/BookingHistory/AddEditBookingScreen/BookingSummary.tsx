import { Button, Text } from '@ui-kitten/components';
import { Booking } from 'model';
import React, { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { formatCurrency } from 'utils';

const BookingSummary = ({
  bookingData,
  onCancel,
  onCreate,
}: {
  bookingData: Booking;
  onCancel: () => void;
  onCreate: () => void;
}) => {
  return (
    <ScrollView style={styles.Container}>
      <Text category="h6" style={{ marginBottom: 18 }}>
        Confirmation Page:
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Guest Name: <Text style={styles.confirmationInputValue}>{bookingData.guestName}</Text>
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Guest Email: <Text style={styles.confirmationInputValue}>{bookingData.guestEmail}</Text>
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Guest Phone Number:{' '}
        <Text style={styles.confirmationInputValue}>{bookingData.guestPhoneNumber}</Text>
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Guest NRIC: <Text style={styles.confirmationInputValue}>{bookingData.status}</Text>
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Rooms:{' '}
        <Text style={styles.confirmationInputValue}>
          {bookingData.rooms.map((item: any) => item.name).join(', ')}
        </Text>
      </Text>

      <Text style={styles.confirmationInputLabel}>
        Booking Status: <Text style={styles.confirmationInputValue}>{bookingData.status}</Text>
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Booking Type: <Text style={styles.confirmationInputValue}>{bookingData.type}</Text>
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Booking start date:{' '}
        <Text style={styles.confirmationInputValue}>
          {new Date(bookingData.bookingStartDate).toLocaleDateString()}
        </Text>
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Booking End Date:{' '}
        <Text style={styles.confirmationInputValue}>
          {new Date(bookingData.bookingEndDate).toLocaleDateString()}
        </Text>
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Total Price:{' '}
        <Text style={styles.confirmationInputValue}>{formatCurrency(bookingData.price)}</Text>
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Description/Notes:{' '}
        <Text style={styles.confirmationInputValue}>{bookingData.description}</Text>
      </Text>
      <Text style={styles.confirmationInputLabel}>
        Pending price paid:{' '}
        <Text style={styles.confirmationInputValue}>
          {formatCurrency(bookingData?.pendingPricePaid || 0)}
        </Text>
      </Text>
      <Button
        style={{
          marginTop: 16,
        }}
        onPress={onCancel}
        appearance="outline"
      >
        Cancel
      </Button>
      <Button
        style={{
          marginTop: 16,
          marginBottom: 52,
        }}
        onPress={onCreate}
      >
        Confirm & Add
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 22,
  },
  input: {
    marginBottom: 12,
  },
  confirmationInputLabel: {
    color: 'grey',
    marginBottom: 8,
  },
  confirmationInputValue: {
    fontWeight: '500',
  },
});

export default memo(BookingSummary);
