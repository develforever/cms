import Center from '@app/Component/Pages/Page/Edit/Center';
import Layout, { SlotNames } from '@app/Layout';
import React from 'react';

function Edit() {
  return (
    <>
      <Layout>
        <Center data-slot={SlotNames.Center}>page edit</Center>
        <div data-slot={SlotNames.Right}>edit right </div>
      </Layout>
    </>
  );
}

export default Edit;
