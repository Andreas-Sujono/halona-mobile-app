import React, { memo } from 'react';
import { Layout, Text } from '@ui-kitten/components';

function ProfileMainScreen() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Profile DASHBOARD</Text>
    </Layout>
  );
}

export default memo(ProfileMainScreen);
