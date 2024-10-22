import { LayoutSlotProps } from "@app/Layout"
import React from "react"
import Card from "../../UI/Card"
import { Link } from "react-router-dom"

const Center: React.FC<LayoutSlotProps> = ({ children }) => {

    return <div className="d-flex">

        <Card>
            <Link to={"pages"} key={0} >Go to pages list</Link>
        </Card>

        <Card>
            <Link to={"create/page"} key={1} >Create new page</Link>
        </Card>

    </div>

}

export default Center