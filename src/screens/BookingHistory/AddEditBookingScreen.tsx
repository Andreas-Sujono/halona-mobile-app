import React, { memo } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

function AddEditBookingScreen() {
  return (
    <ScrollView style={styles.Container}>
      <Text>AddEditBookingScreen History</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    background: 'white',
  },
});

export default memo(AddEditBookingScreen);
