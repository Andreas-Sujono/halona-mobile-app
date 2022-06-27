import React, { memo, useEffect, useState } from 'react';
import { Button, Input } from '@ui-kitten/components';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useMyAccountData, useUpdateMyAccount } from 'hooks/api/auth/useUserData';
import { User } from 'model';
import { Page } from 'components/Native';

function UpdateProfileScreen() {
  const { data } = useMyAccountData();
  const { mutate: updateAccount, isLoading } = useUpdateMyAccount();
  const [profileData, setProfileData] = useState<Partial<User>>({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const updateProfileData = (key: keyof typeof profileData, value: any) => {
    setProfileData({
      ...profileData,
      [key]: value,
    });
  };

  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data]);

  const onUpdate = async () => {
    updateAccount(profileData);
  };

  return (
    <Page style={styles.Container}>
      <Input
        value={profileData?.fullName}
        label="Full Name*"
        placeholder="Input your full name"
        onChangeText={(nextValue) => updateProfileData('fullName', nextValue)}
        style={styles.input}
      />

      <Input
        value={profileData?.email}
        label="Email"
        placeholder="Input your email"
        onChangeText={(nextValue) => updateProfileData('email', nextValue)}
        style={styles.input}
      />
      <Input
        value={profileData?.phoneNumber}
        label="Phone Number"
        placeholder="Input your phone number"
        onChangeText={(nextValue) => updateProfileData('phoneNumber', nextValue)}
        style={styles.input}
      />

      <Button
        style={{
          marginTop: 16,
          marginBottom: 52,
        }}
        onPress={onUpdate}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator /> : 'Edit My Profile'}
      </Button>
    </Page>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 22,
  },
  input: {
    marginBottom: 12,
  },
});

export default memo(UpdateProfileScreen);
