import Center from '@app/Component/Pages/Account/Profile/Center';
import Layout, { SlotNames } from '@app/Layout';
import React from 'react';

function Profile() {
  return (
    <>
      <Layout>
        <Center data-slot={SlotNames.Center}></Center>
      </Layout>
    </>
  );
}

export default Profile;
