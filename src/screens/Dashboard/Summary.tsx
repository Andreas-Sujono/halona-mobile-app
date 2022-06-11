import React, { memo } from 'react';
import { Layout, Text } from '@ui-kitten/components';

function Summary() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h5">Summary</Text>
    </Layout>
  );
}

export default memo(Summary);
