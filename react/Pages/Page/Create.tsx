import AppContext from "@app/AppContext";
import Center from "@app/Component/Pages/Page/Create/Center";
import Layout, { SlotNames } from "@app/Layout";
import React, { useContext, useEffect, useMemo } from "react";
import { useActionData } from "react-router";

function Create() {
    
    return <>
        <Layout>
            <Center data-slot={SlotNames.Center} ></Center>
        </Layout>
    </>
}

export default Create;