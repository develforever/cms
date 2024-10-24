import { LayoutSlotProps } from "@app/Layout"
import React from "react"
import Card from "../../../UI/Card"
import { RouteNames } from "@app/Enum/Route"
import { ApiEndpointNames } from "@app/Enum/Api"
import Form from "@app/Component/UI/Form/Form"

const Center: React.FC<LayoutSlotProps> = ({ }) => {

    return <>
        <Card>
            <Form url={ApiEndpointNames.PAGE_STORE} redirectUrl={RouteNames.PANEL_PAGES}>
                <div>
                    <label className="form-label">Title</label>
                    <input name="title" className="form-control" type="text" />
                </div>
                <div>
                    <label className="form-label">Content</label>
                    <textarea name="content" className="form-control" ></textarea>
                </div>
            </Form>
        </Card>
    </>

}

export default Center