import React, { createElement, ReactElement, useContext, useEffect } from "react";
import AppContext from "@app/AppContext";
import Modal from "@app/Modal";
import { ModalConfig } from "./Types/AppTypes";


function Modals() {

    const context = useContext(AppContext);

    let key = 1;
    let children:ReactElement[] = [];

    context?.modals?.forEach((conf:ModalConfig) => {
        conf.key = key++;
        
        let tmp = createElement(Modal, conf);

        children.push(tmp);
    });

    return <>
        {children}
    </>

}

export default Modals