import React, { memo, useState } from 'react';
import { StyleSheet, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import { Button, Card, Layout, Text, Input } from '@ui-kitten/components';
import { navigate } from 'navigators/utils';

const Header = (props: any) => (
  <View {...props}>
    <Text category="h6" style={{ textAlign: 'center' }}>
      SignUp
    </Text>
    <Text category="s1" style={{ textAlign: 'center' }}>
      Good day Mate!
    </Text>
  </View>
);

const Footer = (props: any) => {
  const goToLogin = () => {
    navigate('Login');
  };
  return (
    <View {...props}>
      <Text appearance="hint" style={{ marginBottom: 18 }} category="p2">
        Already have an account?
        <Text style={styles.textLink} onPress={goToLogin}>
          &nbsp;Sign In here!
        </Text>
      </Text>
      <View style={styles.footerContainer}>
        <Button style={styles.footerControl} size="small">
          SIGN UP
        </Button>
      </View>
    </View>
  );
};

function SignUpScreen() {
  const dimension = useWindowDimensions();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://png.pngtree.com/background/20210710/original/pngtree-c4d-flat-local-hotel-scene-e-commerce-promotion-background-picture-image_1052228.jpg',
          width: dimension.width,
          height: 150,
        }}
      />
      <Layout style={styles.topContainer}>
        <Card style={styles.card} header={Header} footer={Footer} activeOpacity={1}>
          <Input
            value={fullName}
            label="Full Name"
            placeholder="Input your full name here"
            onChangeText={(nextValue) => setFullName(nextValue)}
            style={{
              marginBottom: 16,
            }}
          />
          <Input
            value={username}
            label="Username"
            placeholder="Input your username here"
            onChangeText={(nextValue) => setUsername(nextValue)}
            style={{
              marginBottom: 4,
            }}
          />
          <Text appearance="hint" style={{ marginBottom: 16 }} category="p2">
            Username must be unique
          </Text>

          <Input
            value={email}
            label="Email"
            placeholder="Input your email here"
            onChangeText={(nextValue) => setEmail(nextValue)}
            style={{
              marginBottom: 16,
            }}
          />
          <Input
            value={phoneNumber}
            label="Phone Number"
            placeholder="+6281290123842"
            onChangeText={(nextValue) => setPhoneNumber(nextValue)}
            style={{
              marginBottom: 4,
            }}
          />
          <Text appearance="hint" style={{ marginBottom: 16 }} category="p2">
            Example: +6281290123842
          </Text>
          <Input
            value={password}
            label="Password"
            placeholder="Input your password here"
            secureTextEntry
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
        </Card>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    opacity: 1,
    backgroundColor: 'white',
    flex: 1,
  },
  image: {},
  card: {
    flex: 1,
    margin: 2,
    opacity: 1,
    backgroundColor: 'white',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  textLink: {
    color: 'lightblue',
  },
});

export default memo(SignUpScreen);
