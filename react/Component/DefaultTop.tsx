import React from "react";
import Breadcrumb from "./UI/Breadcrumb";
import UserDropDown from "./UI/UserDropDown";

function DefaultTop() {

    return <>
        <div className="d-flex justify-content-between p-2">
            <div>
                <p style={{margin:0}}>CMS</p>
                <div>
                    <Breadcrumb></Breadcrumb>
                </div>
            </div>
            <div>
            </div>
            <div>
                <UserDropDown>
                    <p>No user</p>
                </UserDropDown>
            </div>
        </div>
    </>
}

export default DefaultTop;