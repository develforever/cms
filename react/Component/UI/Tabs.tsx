import AppContext from "@app/AppContext";
import { LayoutSlotProps } from "@app/Layout"
import React, { MouseEventHandler, useCallback, useContext, useEffect, useState } from "react"

const Tabs: React.FC<{ active: number, onTab: (selected: number) => void, tabs: { label: string, content: React.ReactNode }[] }> = ({ active, tabs, onTab }) => {


    const onClick = useCallback((e: any) => {
        let selected = e.target.dataset.key;
        onTab(selected);
    }, [active]);

    const tabLabels = [...tabs].map((t, i) => {
        return <li className="nav-item" key={i}>
            <a className={`nav-link${i == active ? ' active' : ''}`} aria-current="page" data-key={i} onClick={onClick} href="#">{t.label}</a>
        </li>
    });

    const tabContents = [...tabs].filter((e, i) => {
        return i == active
    }).
        map((t, i) => {
            return <div className="tab-content" key={i}>{t.content}</div>
        });

    return <div className="d-flex flex-column">
        <ul className="nav nav-tabs">
            {tabLabels}
        </ul>
        <div>
            {tabContents}
        </div>
    </div>

}

export default Tabs