
import AppContext from "@app/AppContext";
import Center from "@app/Component/Pages/Home/Center";
import Layout, { SlotNames } from "@app/Layout";
import React, { useContext } from "react";
import { Outlet, RouteObject, useLoaderData } from "react-router-dom";

export function getRoutes(): RouteObject[] {

    return [
        {
            index: true,
            element: <Home></Home>,
        },
    ];
};


function Home() {

    console.debug(`render home page`);
    const context = useContext(AppContext);

    return <>
        <Layout>
            <Center data-slot={SlotNames.Center} ></Center>
        </Layout>
        <Outlet />
    </>
}

export default Home;