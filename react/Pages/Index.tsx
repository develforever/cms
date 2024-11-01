import Center from '@app/Component/Pages/Index/Center';
import Layout, { SlotNames } from '@app/Layout';
import React from 'react';
import { RouteObject } from 'react-router-dom';

export function getRoutes(): RouteObject[] {
  return [];
}

function Index() {
  console.debug(`render index page`);

  return (
    <>
      <Layout>
        <Center data-slot={SlotNames.Center}></Center>
      </Layout>
    </>
  );
}

export default Index;
