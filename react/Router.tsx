import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import ErrorPage from "@app/Pages/ErrorPage";
import Redirect from "@app/Component/Redirect";

function routes(panelsRoutes?: RouteObject[]): RouteObject[] {

    let routeValues: RouteObject[] = [
        {

            id: "home",
            path: "/",
            element: <Outlet></Outlet>,
            errorElement: <ErrorPage />,
            handle: {
                name: "#"
            },
            children: [
                {
                    path: "/",
                    element: <Redirect to="/"></Redirect>
                },
                {
                    id: "panel",
                    path: "/panel",
                    handle: {
                        name: "Panel"
                    },
                    element: <Outlet></Outlet>,
                    children: panelsRoutes ? panelsRoutes : []
                },
            ],
        },

    ];

    return routeValues;
}

export { routes };


function router(routes: RouteObject[]) {

    const routerValue = createBrowserRouter(routes);
    return routerValue;
}

export default router;