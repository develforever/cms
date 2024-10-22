
import Center from "@app/Component/Pages/Account/Center";
import Layout, { SlotNames } from "@app/Layout";
import React from "react";
import { Outlet, RouteObject, useParams } from "react-router-dom";

export function getRoutes(): RouteObject[] {

    return [
        {
            path: "account/:tab",
            handle: {
                name: "Account {tab}"
            },
            children: [
                {
                    index: true,
                    element: <Account></Account>,
                },
            ],
        },
    ];
};


function Account() {

    return <>
        <Layout>
            <Center data-slot={SlotNames.Center} ></Center>
        </Layout>
        <Outlet />
    </>
}

export default Account;