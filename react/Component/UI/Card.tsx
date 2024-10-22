import { LayoutSlotProps } from "@app/Layout"
import React from "react"

const Card: React.FC<{title?:string, children?:any}> = ({ title, children }) => {
    return <div className="d-flex ps-2">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {children}
            </div>
        </div>
    </div>

}

export default Card