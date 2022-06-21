import React, { memo, useContext } from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { CheckAppUpdateContext } from 'Context/useCheckAppUpdate';
// import { useMyAccountData } from 'hooks/api/auth/useUserData';
import Icon from 'react-native-vector-icons/FontAwesome';

function SettingScreen() {
  // const { data } = useMyAccountData();
  const appUpdateContext = useContext(CheckAppUpdateContext);

  return (
    <ScrollView style={styles.Container}>
      <TouchableOpacity
        onPress={appUpdateContext.onCheckServerVersion}
        style={styles.pageSectionContainer}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Icon name="upload" size={16} color="#0d43ee" style={styles.icon} />
          <Text style={styles.pageLink}>Check Updates</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 16,
    // paddingTop: 22,
  },
  pageSectionContainer: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  icon: {
    marginRight: 12,
  },
  pageLink: {
    color: '#0d43ee',
  },
});

export default memo(SettingScreen);
