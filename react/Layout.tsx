import React, { ReactNode, Suspense } from "react";
import { Config } from "./Layout/Settings";

import * as bootstrapcss from "@app/css/bootstrap.css";
import * as appcss from "@app/css/app.css";

import * as layoutcss from "@app/css/layout.css";

bootstrapcss;
appcss;
layoutcss;

export enum SlotNames {
    Top = "top",
    Bottom = "bottom",
    Left = "left",
    Center = "center",
    Right = "right"
}


export type LayoutSlotProps = {
    "data-slot": SlotNames,
    children?: any
}

function Top(props) {
    return <div className={props.className}>{props.children}</div>;
}
function Bottom(props) {
    return <div className={props.className}>{props.children}</div>;
}
function Left(props) {
    return <div className={props.className}>{props.children}</div>;
}
function Right(props) {
    return <div className={props.className}>{props.children}</div>;
}

function Center(props) {
    return <div className={props.className}>{props.children}</div>;
}



const Layout: React.FC<{ children: any }|any> = ({ children, ...props }) => {

    let top = Config.getDefaultTopComp();
    let bottom = Config.getDefaultBottomComp();
    let left = Config.getDefaultLeftComp();
    let center = Config.getDefaultCenterComp<ReactNode>();
    let right = Config.getDefaultRightComp();
    let rest: React.ReactElement[] = [];

    React.Children.forEach<React.ReactElement>(children, (child) => {
        if (!React.isValidElement(child)) return;

        if (child.props["data-slot"] === SlotNames.Top) {
            top = child;
        } else if (child.props["data-slot"] === SlotNames.Bottom) {
            bottom = child;
        } else if (child.props["data-slot"] === SlotNames.Left) {
            left = child;
        } else if (child.props["data-slot"] === SlotNames.Center) {
            center = child;
        } else if (child.props["data-slot"] === SlotNames.Right) {
            right = child;
        } else {
            rest.push(child);
        }
    });

    return <div {...props} className="d-flex flex-column position-relative">
        <Top className="top-bar" style={{ zIndex: 10 }}>{top}</Top>
        <div className="d-flex flex-fill center-bar" style={{ zIndex: 1 }}>
            <Left className="left-side shadow flex-shrink-1 bg-dark-subtle">{left}</Left>
            <Center className="center-side flex-fill flex-grow-1 overflow-hidden">
                <Suspense fallback={<div>Loading...</div>}>
                    {center}
                </Suspense>
                </Center>
            <Right className="right-side flex-shrink-1">{right}</Right>
        </div>
        <Bottom className="bottom-bar" style={{ zIndex: 10 }}>{bottom}</Bottom>
        {rest}
    </div>
}


export default Layout;