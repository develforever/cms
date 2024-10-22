import Table from "@app/Component/UI/Table/Table";
import { ApiEndpointNames, ApiPageResource, ApiResponsePageList } from "@app/Enum/Api";
import { RouteNames } from "@app/Enum/Route";
import useNavigate from "@app/hooks/useNavigate";
import { LayoutSlotProps } from "@app/Layout"
import useDataService, { Status } from "@app/Services/DataService";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLocation, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";


const Center: React.FC<LayoutSlotProps> = ({ }) => {

    console.debug('page list render');

    const navigate = useNavigate(RouteNames.PANEL_PAGES_VIEW);

    return (<div className="overflow-y-hidden">
        <Table<ApiPageResource, ApiResponsePageList>
            url={ApiEndpointNames.PAGE_LIST}
            onView={(row) => {
                navigate({ id: row.data.id }, { state: { row } });
            }}
            cols={{
                id: "Id",
                title: "Title",
            }}></Table>
    </div>)

}

export default Center