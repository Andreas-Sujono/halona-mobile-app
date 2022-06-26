import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
} from 'react-native';
import { useLogout, useMyAccountData } from 'hooks/api/auth/useUserData';
import { navigate } from 'navigators/utils';
import Page from 'components/Native/Page';
import View from 'components/Native/View';
import Text from 'components/Native/Text';

function ProfileMainScreen() {
  const { mutate: logout } = useLogout();
  const { data: myAccount } = useMyAccountData();
  // console.log('myAccount: ', myAccount);

  const goToChildScreen = (screenName = '') =>
    navigate('BottomTabs', {
      screen: 'ProfileStack',
      params: {
        screen: screenName,
      },
    });

  return (
    <Page style={{ flex: 1, backgroundColor: 'white' }}>
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
              <Icon name="location-arrow" style={styles.placeIcon} />
              <View style={styles.userCityRow}>
                <RNText style={styles.userCityText}>Purwokerto, Indonesia</RNText>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <TouchableOpacity
        style={styles.pageSectionContainer}
        onPress={() => goToChildScreen('UpdateProfile')}
      >
        <Text category="p1" style={styles.pageLink} color="textCta">
          Update Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pageSectionContainer}
        onPress={() => goToChildScreen('Settings')}
      >
        <Text category="p1" style={styles.pageLink} color="textCta">
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pageSectionContainer} onPress={() => logout(true)}>
        <Text category="p1" style={styles.pageLink} color="textCta">
          Log out
        </Text>
      </TouchableOpacity>
    </Page>
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
  headerContainer: {
    backgroundColor: 'transparent',
  },
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
    backgroundColor: 'transparent',
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  userCityRow: {
    marginLeft: 8,
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'transparent',
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
    // color: '#0d43ee',
  },
});

export default memo(ProfileMainScreen);
