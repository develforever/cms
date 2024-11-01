import Center from '@app/Component/Pages/Page/Create/Center';
import Layout, { SlotNames } from '@app/Layout';
import React from 'react';

function Create() {
  return (
    <>
      <Layout>
        <Center data-slot={SlotNames.Center}></Center>
      </Layout>
    </>
  );
}

export default Create;
