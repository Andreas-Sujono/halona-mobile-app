import React, { memo, useState } from 'react';
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import { Button, Card, Layout, Text, Input } from '@ui-kitten/components';
import { navigate } from 'navigators/utils';
import { useLogin } from 'hooks/api/auth/useUserData';

const Header = (props: any) => (
  <View {...props}>
    <Text category="h6" style={{ textAlign: 'center' }}>
      Login
    </Text>
    <Text category="s1" style={{ textAlign: 'center' }}>
      Welcome back!
    </Text>
  </View>
);

const Footer = (props: any) => {
  const goToSignup = () => {
    navigate('SignUp');
  };
  return (
    <View {...props}>
      <Text appearance="hint" style={{ marginBottom: 18 }} category="p2">
        Don't have an account yet?
        <Text style={styles.textLink} onPress={goToSignup}>
          &nbsp;create account here!
        </Text>
      </Text>
      <View style={styles.footerContainer}>
        <Button
          style={styles.footerControl}
          size="small"
          disabled={props.disabled}
          onPress={props.onLogin}
        >
          LOGIN
        </Button>
      </View>
    </View>
  );
};

function LoginScreen() {
  const dimension = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isLoading } = useLogin();

  const onLogin = async () => {
    await mutate({
      email: username,
      password,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://c0.wallpaperflare.com/preview/301/518/475/hotel-room-blue-dark.jpg',
          width: dimension.width,
          height: 200,
        }}
      />
      <Layout style={styles.topContainer}>
        <Card
          style={styles.card}
          header={Header}
          footer={<Footer disabled={isLoading} onLogin={onLogin} />}
          activeOpacity={1}
        >
          <Input
            value={username}
            label="Username"
            placeholder="Input your username here"
            onChangeText={(nextValue) => setUsername(nextValue)}
            style={{
              marginBottom: 16,
            }}
          />
          <Input
            value={password}
            label="Password"
            placeholder="Input your password here"
            secureTextEntry
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
        </Card>
      </Layout>
    </View>
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

export default memo(LoginScreen);
