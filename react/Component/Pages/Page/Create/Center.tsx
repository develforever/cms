import { LayoutSlotProps } from "@app/Layout"
import React, { useContext } from "react"
import Card from "../../../UI/Card"
import { RouteNames } from "@app/Enum/Route"
import { ApiEndpointNames } from "@app/Enum/Api"
import Form from "@app/Component/UI/Form/Form"
import AppContext from "@app/AppContext"

const Center: React.FC<LayoutSlotProps> = ({ }) => {

    const context = useContext(AppContext);
    const url = context.links ? context.links[ApiEndpointNames.PAGE_STORE] : null;

    return <>
        <Card>
            {url && <Form url={url} redirectUrl={RouteNames.PANEL_PAGES}>
                <div>
                    <label className="form-label">Title</label>
                    <input name="title" className="form-control" type="text" />
                </div>
                <div>
                    <label className="form-label">Content</label>
                    <textarea name="content" className="form-control" ></textarea>
                </div>
            </Form>}
        </Card>
    </>

}

export default Center