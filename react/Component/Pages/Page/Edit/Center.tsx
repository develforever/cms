import { LayoutSlotProps } from "@app/Layout"
import React from "react"
import Card from "@app/Component/UI/Card"
import { useLocation } from "react-router-dom"

const Center: React.FC<LayoutSlotProps> = ({ children }) => {

    const location = useLocation();

    return <Card title={`#${location.state.row.data.id}, ${location.state.row.data.title}`}>
        {JSON.stringify(location.state.row.data)}
    </Card>

}

export default Center