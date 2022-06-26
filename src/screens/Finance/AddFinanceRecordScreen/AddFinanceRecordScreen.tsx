/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
import { Button, Datepicker, Input, Text } from '@ui-kitten/components';
import { FinanceRecord } from 'model';
import { StyleSheet, ScrollView, ActivityIndicator, Platform } from 'react-native';
import Select from 'components/Select';
import {
  useCreateFinanceRecord,
  useDeleteFinanceRecord,
  useUpdateFinanceRecord,
  useFinanceRecordData,
} from 'hooks/api/finance/useFinanceRecordsData';
import { useQueryClient } from 'react-query';
import { QUERY_KEY } from 'hooks/api/queryKeys';
import Toast from 'react-native-toast-message';
import { navigate } from 'navigators/utils';
import { PopUp } from 'components/PopUp';

const recordTypeData = [
  {
    label: 'Income',
    value: 'INCOME',
    index: 0,
  },
  {
    label: 'Cost',
    value: 'COST',
    index: 1,
  },
];

function AddFinanceRecordScreen({ route }: any) {
  const isEditMode = route?.params?.isEditMode;
  const [recordData, setRecordData] = useState<FinanceRecord>(
    route.params?.recordData
      ? {
          ...route.params?.recordData,
        }
      : {
          id: '',
          type: 'INCOME',
          amount: 0,
          name: '',
          category: '',
          description: '',
          date: new Date(),
        }
  );
  const { mutate: updateRecord, isLoading: isUpdateLoading } = useUpdateFinanceRecord(
    recordData?.id
  );
  const { mutate: createRecord, isLoading: isCreateLoading } = useCreateFinanceRecord();
  const { mutate: deleteRecord, isLoading: isDeleteLoading } = useDeleteFinanceRecord(
    recordData?.id
  );

  const queryClient = useQueryClient();
  const { data } = useFinanceRecordData(recordData.id);

  useEffect(() => {
    if (recordData.id) {
      queryClient.invalidateQueries([QUERY_KEY.FINANCE_RECORD, recordData.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setRecordData((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, [data]);

  const updateRecordData = (key: keyof FinanceRecord, value: any) => {
    setRecordData({
      ...recordData,
      [key]: value,
    });
  };

  const validateRecordData = () => {
    let errMessage = '';
    if (!recordData.type) {
      errMessage = 'Missing record type';
    }
    if (!recordData.amount) {
      errMessage = 'Missing record amount';
    }
    if (!recordData.name) {
      errMessage = 'Missing record name';
    }
    // if (!recordData.rooms.length) {
    //   errMessage = 'Missing rooms';
    // }

    if (errMessage) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errMessage,
      });
      return false;
    }

    return true;
  };

  const onCreateOrEdit = async () => {
    //validate
    if (!validateRecordData()) {
      return;
    }
    if (isEditMode) {
      updateRecord(recordData);
      return;
    }
    createRecord(recordData);
    navigate('BottomTabs', {
      screen: 'FinanceStack',
    });
  };

  const onDelete = () => {
    PopUp.show({
      title: 'Are you sure you want to delete this record?',
      type: 'confirm',
      textBody: 'You cannot undo this action!',
      callback: () => deleteRecord({}),
    });
    return;
  };

  return (
    <ScrollView style={styles.Container}>
      <Input
        value={recordData.name}
        label="Record name*"
        placeholder="Place your Text"
        onChangeText={(value: any) => updateRecordData('name', value)}
        style={styles.input}
      />
      <Input
        value={recordData.description}
        label="Record Description"
        placeholder="Place your Text"
        onChangeText={(value: any) => updateRecordData('description', value)}
        style={styles.input}
        keyboardType="number-pad"
      />

      <Select
        label="Record Type"
        items={recordTypeData}
        onChangeValue={(value: any) => updateRecordData('type', value.value)}
        style={styles.input}
        selectedValue={recordData.type}
      />

      <Datepicker
        label="Date"
        placeholder="Date"
        // filter={(date) => new Date(date) >= moment().startOf('day').toDate()}
        style={styles.input}
        onSelect={(date) => {
          updateRecordData('date', date);
        }}
        date={recordData.date ? new Date(recordData.date) : undefined}
      />

      <Input
        value={recordData.amount.toString()}
        label="Amount*"
        placeholder="Place your Text"
        onChangeText={(value: any) => updateRecordData('amount', value)}
        style={styles.input}
        keyboardType="decimal-pad"
      />

      <Button
        style={{
          marginTop: 16,
          marginBottom: isEditMode ? 0 : 52,
        }}
        onPress={onCreateOrEdit}
        disabled={isUpdateLoading}
      >
        {isCreateLoading || isUpdateLoading ? (
          <ActivityIndicator />
        ) : isEditMode ? (
          'Edit Record'
        ) : (
          'Create Record'
        )}
      </Button>
      {isEditMode && (
        <Button
          style={{
            marginBottom: 52,
            marginTop: 6,
            backgroundColor: '#de2944',
            borderWidth: 0,
          }}
          onPress={onDelete}
        >
          Delete Record
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    padding: Platform.OS === 'ios' ? 24 : 26,
    paddingTop: 22,
  },
  input: {
    marginBottom: 12,
  },
});

export default memo(AddFinanceRecordScreen);
