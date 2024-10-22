
import Center from "@app/Component/Pages/Page/Details/Center";
import Layout, { SlotNames } from "@app/Layout";
import React from "react";

function Details() {
    
    return <>
        <Layout>
            <Center data-slot={SlotNames.Center} >page details</Center>
        </Layout>
    </>
}

export default Details;