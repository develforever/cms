
import React, { Suspense, useContext, useEffect, useRef } from "react";
import { RouterProvider } from "react-router-dom";
import AppContext from "@app/AppContext";
import useUserAuth from "@app/Services/UserAuth";
import { useService } from "./Services/DataService";

function App() {

    console.log('render app');
    useService();

    const context = useContext(AppContext);
    const router = context.router;
    return <div className="app w-100 h-100 q">
        <RouterProvider router={router}></RouterProvider>
    </div>

}


export default App