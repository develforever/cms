import { LayoutSlotProps } from "@app/Layout"
import React from "react"
import Card from "../../../UI/Card"
import { RouteNames } from "@app/Enum/Route"
import { ApiEndpointNames } from "@app/Enum/Api"
import Form from "@app/Component/UI/Form/Form"

const Center: React.FC<LayoutSlotProps> = ({ }) => {

    return <>
        <Card>
            <Form url={ApiEndpointNames.PAGE_STORE} redirectUrl={RouteNames.PANEL_PAGES}></Form>
        </Card>
    </>

}

export default Center