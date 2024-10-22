import AppContext from "@app/AppContext";
import React, { useContext, useEffect } from "react"
import { useNavigation } from "react-router-dom";

const Guard: React.FC<any> = ({ children }) => {

    const context = useContext(AppContext);

    const nav = useNavigation();

    function subRouter(state:any) {
        console.log({ ...state }, nav);
    }

    let sub:any = null;

    useEffect(() => {

        console.log(context.isAuthenticated);
        if (sub) {
            return
        }
        console.log('route changed', context);

        sub = context.router.subscribe(subRouter);

    }, []);

    console.log(context.isAuthenticated);
    return <>
        { context.isAuthenticated ? children : null}
    </>

}

export default Guard