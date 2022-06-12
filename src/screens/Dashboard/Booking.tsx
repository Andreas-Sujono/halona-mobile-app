import React, { memo } from 'react';
import { Layout, Text } from '@ui-kitten/components';

function Booking() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h5">Booking</Text>
    </Layout>
  );
}

export default memo(Booking);
