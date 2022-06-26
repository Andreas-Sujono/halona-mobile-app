import { Text } from '@ui-kitten/components';
import { FinanceRecord } from 'model';
import { navigate } from 'navigators/utils';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { formatCurrency, formatDate } from 'utils';

function FinanceRecordCard({ data }: { data: Partial<FinanceRecord> }) {
  const goToAddEditScreen = () =>
    navigate('BottomTabs', {
      screen: 'FinanceStack',
      params: {
        screen: 'EditFinanceRecord',
        params: {
          isEditMode: true,
          recordData: data,
          initial: false,
        },
      },
    });
  const date = new Date(data.date || data.createdAt || new Date());

  return (
    <TouchableOpacity style={styles.Container} onPress={goToAddEditScreen}>
      <View style={styles.leftSection}>
        <Text
          category="p1"
          style={{
            fontWeight: 'bold',
          }}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {data.name || data.type}
        </Text>
        <View style={[styles.InputContainer, , { marginTop: 12 }]}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.inputValue}>{formatDate(date)}</Text>
        </View>
        <View style={[styles.InputContainer, , { marginTop: 12 }]}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.inputValue}>{data.type?.toLocaleLowerCase()}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text
          style={[
            styles.inputValue,
            {
              color: data.type === 'INCOME' ? 'green' : 'red',
              fontSize: 18,
            },
          ]}
        >
          {data.type === 'INCOME' ? '+ ' : '- '}
          {formatCurrency(data.amount!)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    paddingLeft: 24,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  leftSection: { flex: 2 },
  rightSection: { flex: 1 },
  InputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    color: 'grey',
    marginRight: 12,
  },
  inputValue: {
    fontWeight: '500',
  },
});

export default memo(FinanceRecordCard);
