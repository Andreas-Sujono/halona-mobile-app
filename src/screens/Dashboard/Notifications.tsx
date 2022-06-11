import React, { memo } from 'react';
import { Layout, Text } from '@ui-kitten/components';

function Notifications() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h5">Notif</Text>
    </Layout>
  );
}

export default memo(Notifications);
