import AppContext from "@app/AppContext";
import Center from "@app/Component/Pages/Page/Edit/Center";
import Layout, { SlotNames } from "@app/Layout";
import React, { useContext, useEffect, useMemo } from "react";

function Edit() {

    const context = useContext(AppContext);
    
    return <>
        <Layout>
            <Center data-slot={SlotNames.Center} >page view</Center>
            <div data-slot={SlotNames.Right}>ddd</div>
        </Layout>
    </>
}

export default Edit;