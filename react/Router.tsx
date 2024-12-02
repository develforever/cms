import React from 'react';
import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import ErrorPage from '@app/Pages/ErrorPage';
import Index from '@app/Pages/Index';
import Login from '@app/Pages/Index/Login';

/**
 * 
 * @param RouteObject[] panelsRoutes 
 * @returns RouteObject[]
 */
function routes(panelsRoutes?: RouteObject[]): RouteObject[] {
  let routeValues: RouteObject[] = [
    {
      id: 'home',
      path: '/',
      element: <Outlet></Outlet>,
      errorElement: <ErrorPage />,
      handle: {
        name: '#',
      },
      children: [
        {
          index: true,
          element: <Index></Index>,
        },
        {
          path: 'login',
          element: <Login></Login>,
          action: async ({ request }) => {
            let formData = await request.formData();
            return formData;
          },
          handle: {
            name: 'Login',
          },
        },
        {
          id: 'panel',
          path: '/panel',
          handle: {
            name: 'Panel',
          },
          element: <Outlet></Outlet>,
          children: panelsRoutes ? panelsRoutes : [],
        },
      ],
    },
  ];

  return routeValues;
}

/**
 * Dock block for routes3
 */
export { routes };

function router(routes: RouteObject[]) {
  const routerValue = createBrowserRouter(routes);
  return routerValue;
}

export default router;
