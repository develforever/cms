import Center from '@app/Component/Pages/Account/Settings/Center';
import Layout, { SlotNames } from '@app/Layout';
import React from 'react';

function Settings() {
  return (
    <>
      <Layout>
        <Center data-slot={SlotNames.Center}>page view</Center>
        <div data-slot={SlotNames.Right}>ddd</div>
      </Layout>
    </>
  );
}

export default Settings;
