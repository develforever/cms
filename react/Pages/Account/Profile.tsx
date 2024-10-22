import AppContext from "@app/AppContext";
import Center from "@app/Component/Pages/Account/Profile/Center";
import Layout, { SlotNames } from "@app/Layout";
import React, { useContext, useEffect, useMemo } from "react";
import { useActionData } from "react-router";

function Profile() {
    
    return <>
        <Layout>
            <Center data-slot={SlotNames.Center} ></Center>
        </Layout>
    </>
}

export default Profile;