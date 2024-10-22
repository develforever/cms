"use strict";

import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from 'react-dom/client';

// app
import App from "@app/App";
import Modals from "@app/Modals";
import AppContext from "@app/AppContext";
import useAppStateInit from "@app/AppState";
import { ModalProps } from "@app/Modal";
import { ModalPluginEvent, ModalsPluginEvent } from "@app/AppState/Plugin/ModalsPlugin";
import { AppState } from "./Types/AppTypes";
import { generatePath } from "react-router-dom";


const Root: React.FC<{ children?: any }> = ({ children }) => {

    console.log('root render');
    
    const [state, setState] = useAppStateInit();

    useEffect(() => {

        console.log('root auth');

        // todo testing purposes
        // make authenticated
        // setState((state) => {
        //     return { ...state, user: { username: "asdasdasd" } }
        // });

        // 
        // setTimeout(() => {
        //     state.plugin.ModalsPlugin.next({
        //         event: ModalsPluginEvent.ADD,
        //         data: {
        //             title: "Modal my title",
        //             onClose: () => {
        //                 console.log("modal close listener");
        //             },
        //             onOk: () => {
        //                 console.log("modal ok listener");
        //             },
        //             onCancel: () => {
        //                 console.log("modal cancel listener");
        //             }
        //         } as ModalProps
        //     } as ModalPluginEvent);
        // }, 1000);

    }, []);

    return <>
        <AppContext.Provider value={state}>
            <App key="app"></App>
            <Modals key="modal"></Modals>
        </AppContext.Provider>
    </>

}


export default function () {

    // @ts-ignore
    const node = document.querySelector('#root.has-app')
    if (node) {
        const root = createRoot(node);
        root.render(<Root></Root>);
    }
}