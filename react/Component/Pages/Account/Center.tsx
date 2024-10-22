import AppContext from "@app/AppContext";
import { LayoutSlotProps } from "@app/Layout"
import React, { useCallback, useContext } from "react"
import Tabs from "@app/Component/UI/Tabs";
import { useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "@app/Enum/Route";

const Center: React.FC<LayoutSlotProps> = ({ children }) => {

    const context = useContext(AppContext);
    const { tab } = useParams();

    let active = tab === "profile" ? 0 : 1;
    const navigate = useNavigate();

    const props = {
        active,
        onTab: useCallback((selected: number) => {
            if (selected == 0) {
                navigate(RouteNames.PANEL_USER_PROFILE);
            } else {
                navigate(RouteNames.PANEL_USER_SETTINGS);
            }
        }, [active]),
        tabs: [
            {
                label: "Profile",
                content: <div>
                    <label className="form-label">{context.user?.username}</label>
                </div>
            },
            {
                label: "Settings",
                content: "todo"
            },
        ]
    };
    return <div className="d-flex">

        <Tabs {...props}></Tabs>

    </div>

}

export default Center