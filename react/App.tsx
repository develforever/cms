
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
    const auth = useUserAuth();


    return <div className="app w-100 h-100 q">
        {/* {JSON.stringify(user.current)} */}
        {context.isAuthenticated() ? <RouterProvider router={router} /> : <div className="dot-loader">Loading <span className="dot-loader--dots"></span></div>}
    </div>

}


export default App