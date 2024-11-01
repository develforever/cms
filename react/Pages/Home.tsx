import Center from '@app/Component/Pages/Home/Center';
import Layout, { SlotNames } from '@app/Layout';
import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

export function getRoutes(): RouteObject[] {
  return [
    {
      index: true,
      element: <Home></Home>,
    },
  ];
}

function Home() {
  console.debug(`render home page`);

  return (
    <>
      <Layout>
        <Center data-slot={SlotNames.Center}></Center>
      </Layout>
      <Outlet />
    </>
  );
}

export default Home;
