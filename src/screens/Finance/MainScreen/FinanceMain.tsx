/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, memo } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useAllFinanceRecordsData } from 'hooks/api/finance/useFinanceRecordsData';
import View from 'components/Native/View';
import { QUERY_KEY } from 'hooks/api/queryKeys';
import { useQueryClient } from 'react-query';
import Text from 'components/Native/Text';
import FinanceRecordCard from 'components/FinanceRecordCard';
import { Button } from '@ui-kitten/components';
import { navigate } from 'navigators/utils';
import Header from './Header';

function FinanceMain() {
  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();
  const { data, isLoading } = useAllFinanceRecordsData();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    queryClient.invalidateQueries(QUERY_KEY.ALL_FINANCE_RECORDS);
    queryClient.invalidateQueries(QUERY_KEY.FINANCE_SUMMARY_THIS_MONTH);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRefreshing(false);
  }, [queryClient]);

  const renderFooter = () => (
    <View style={styles.footerText}>
      {/* {isLoading && <ActivityIndicator />} */}
      <Text>No more booking at the moment</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
    </View>
  );

  const goToAddEditScreen = () =>
    navigate('BottomTabs', {
      screen: 'FinanceStack',
      params: {
        screen: 'EditFinanceRecord',
        params: {
          isEditMode: false,
          initial: false,
        },
      },
    });

  const chosenData = data;
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
        data={chosenData}
        renderItem={({ item }) => <FinanceRecordCard data={item} />}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <>
            <Header />
            <Button style={styles.createButton} onPress={goToAddEditScreen}>
              Create new Record
            </Button>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 0,
    backgroundColor: 'white',
    flex: 1,
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    margin: 12,
    width: '50%',
  },
});

export default memo(FinanceMain);
