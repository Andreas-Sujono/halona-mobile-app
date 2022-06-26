import { Text } from '@ui-kitten/components';
import { View } from 'components/Native';
import { useFinanceSummaryThisMonthData } from 'hooks/api/finance/useFinanceRecordsData';
import React, { memo } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import SummaryCard from './SummaryCard';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

function FinanceMainScreen() {
  const { data: financeSummaryThisMonthData } = useFinanceSummaryThisMonthData();

  const data = [
    {
      name: 'Income',
      population: financeSummaryThisMonthData?.totalIncome || 0,
      color: '#1ccf6a',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Cost',
      population: financeSummaryThisMonthData?.totalCost || 0,
      color: '#ef2f2f',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const { width } = useWindowDimensions();
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.ChartContainer}>
        <PieChart
          data={data}
          width={width}
          height={220}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 0]}
          absolute
        />
      </View>
      <SummaryCard />
      <View style={styles.NavContainer}>
        <TouchableOpacity style={styles.Card}>
          <Image source={require('../../../assets/saving.png')} style={styles.cardIcon} />
          <Text style={styles.cardText}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Card}>
          <Image source={require('../../../assets/finance.png')} style={styles.cardIcon} />
          <Text style={styles.cardText}>Cost</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    background: 'white',
  },
  ChartContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NavContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Card: {
    flex: 1,
    backgroundColor: 'white',
    minHeight: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  cardIcon: {
    width: 60,
    height: 60,
  },
  cardText: {
    fontWeight: '400',
    fontSize: 16,
    marginTop: 8,
  },
});

export default memo(FinanceMainScreen);
