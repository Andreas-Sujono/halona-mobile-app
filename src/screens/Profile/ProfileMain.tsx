import { Layout, Text } from '@ui-kitten/components';
import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLogout, useMyAccountData } from 'hooks/api/auth/useUserData';
import { navigate } from 'navigators/utils';

function ProfileMainScreen() {
  const { mutate: logout } = useLogout();
  const { data: myAccount } = useMyAccountData();
  console.log('myAccount: ', myAccount);

  const goToUpdateProfileScreen = () =>
    navigate('BottomTabs', {
      screen: 'ProfileStack',
      params: {
        screen: 'UpdateProfile',
      },
    });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerBackgroundImage}
            blurRadius={10}
            source={{
              uri: 'https://img.freepik.com/free-vector/metropolis-night-landscape-neon-cartoon-vector_1441-3163.jpg?w=2000',
            }}
          >
            <View style={styles.headerColumn}>
              <Image
                style={styles.userImage}
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                }}
              />
              <RNText style={styles.userNameText}>{myAccount?.fullName}</RNText>
              <View style={styles.userAddressRow}>
                <View>
                  <Icon name="location-arrow" style={styles.placeIcon} />
                </View>
                <View style={styles.userCityRow}>
                  <RNText style={styles.userCityText}>Purwokerto, Indonesia</RNText>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <TouchableOpacity style={styles.pageSectionContainer} onPress={goToUpdateProfileScreen}>
          <Text category="p1" style={styles.pageLink}>
            Update Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageSectionContainer} onPress={() => logout(true)}>
          <Text category="p1" style={styles.pageLink}>
            Log out
          </Text>
        </TouchableOpacity>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 55,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
    marginLeft: 8,
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 150,
    marginBottom: 15,
    width: 150,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  pageSectionContainer: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  pageLink: {
    color: '#0d43ee',
  },
});

export default memo(ProfileMainScreen);
