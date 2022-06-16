import React, { memo, useEffect, useState } from 'react';
import { Button, Input } from '@ui-kitten/components';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useMyAccountData, useUpdateMyAccount } from 'hooks/api/auth/useUserData';
import { User } from 'model';

function UpdateProfileScreen() {
  const { data } = useMyAccountData();
  const { mutate: updateAccount, isLoading } = useUpdateMyAccount();
  const [profileData, setProfileData] = useState<Partial<User>>({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data]);

  const onUpdate = async () => {
    await updateAccount(profileData);
  };

  return (
    <ScrollView style={styles.Container}>
      <Input
        value={profileData?.fullName}
        label="Full Name*"
        placeholder="Input your full name"
        onChangeText={(nextValue) => console.log(nextValue)}
        style={styles.input}
      />

      <Input
        value={profileData?.email}
        label="Email"
        placeholder="Input your email"
        onChangeText={(nextValue) => console.log(nextValue)}
        style={styles.input}
      />
      <Input
        value={profileData?.phoneNumber}
        label="Phone Number"
        placeholder="Input your phone number"
        onChangeText={(nextValue) => console.log(nextValue)}
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
    </ScrollView>
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
