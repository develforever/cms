import AppContext from "@app/AppContext";
import React, { useContext, useState } from "react";
import { Link, useMatches } from "react-router-dom";


const Breadcrumb: React.FC<{}> = ({ }) => {

    let matches = useMatches();
    let items = [...matches]
    .filter((e)=> e.handle?.name)
    .map((e, i)=>{
        return <Link to={e.pathname} key={i} className={"breadcrumb-item active"} >{e.handle?.name ? e.handle?.name:e.pathname}</Link>
    });


    {/* @ts-ignore */ }
    return <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            {items}
        </ol>
    </nav>
}

export default Breadcrumb;