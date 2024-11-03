import Center from '@app/Component/Pages/Index/Login/Center';
import Layout, { SlotNames } from '@app/Layout';
import React from 'react';
import { RouteObject } from 'react-router-dom';

export function getRoutes(): RouteObject[] {
  return [];
}

function Login() {
  console.debug(`render login page`);

  return (
    <>
      <Layout>
        <Center data-slot={SlotNames.Center}></Center>
      </Layout>
    </>
  );
}

export default Login;
