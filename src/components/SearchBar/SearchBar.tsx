import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';

const SearchBar = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <Input
      value={value}
      placeholder="🔍 Search booking by id, name, room, status"
      onChangeText={onChangeText}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    // marginLeft: 12,
    // marginRight: 12,
    marginTop: 3,
    marginBottom: 8,
  },
});

export default SearchBar;
