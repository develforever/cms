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

/**
 * Home page const component 1
 *
 * This home page where user are start his work.
 *
 * @app_page
 */

const Home: React.FC = () => {
  console.debug(`render home page`);

  return (
    <>
      <Layout>
        <Center data-slot={SlotNames.Center}></Center>
      </Layout>
      <Outlet />
    </>
  );
};

/**
 * Home page1
 *
 * This home page where user are start his work.
 *
 * @app_page
 */
export default Home;
