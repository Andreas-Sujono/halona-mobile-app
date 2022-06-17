import React, { memo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

function AddBorrowItemScreen() {
  return <ScrollView style={styles.Container}>AddBorrowItemScreen</ScrollView>;
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    background: 'white',
  },
});

export default memo(AddBorrowItemScreen);
