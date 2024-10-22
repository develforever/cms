
import { ApiEndpointNames, ApiPageResource, ApiResponsePageList } from "@app/Enum/Api";
import useDataService, { ResponseDataInterface, Status } from "@app/Services/DataService";
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router";

interface TableProps<D, R> {
    cols?: { [key: string]: string },
    showActions?: boolean,
    onView?: (row: D) => void,
    url?: string,
};


//   <Table2<ApiPageResource,ApiResponsePageList>></Table2>

const Table = <D extends ResponseDataInterface, R extends ResponseDataInterface,>({
    url = undefined,
    showActions = true,
    cols = {},
    onView = undefined,
}: TableProps<D, R>): React.ReactElement => {

    if (!url) {
        return <></>;
    }

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const [page, setPage] = useState<number>(+(queryParams.get("page") || "1"));
    const [state, dispatch] = useDataService<R>(url);

    const updateQueryParam = (key: string, value: string) => {
        queryParams.set(key, value);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const data: D[] | undefined = state.result?.data?.data;
    let lastPage = useRef(1);

    const memoDispatch = useCallback(() => {
        dispatch({
            method: "GET",
            params: {
                page,
            }
        })
    }, [page]);

    useEffect(() => {
        updateQueryParam("page", `${page}`);
        memoDispatch();
    }, [page]);

    useEffect(() => {
        
    }, [location.search]);

    useEffect(() => {
        if (state.status === Status.success) {
            // @ts-ignore
            let last: number = state.result?.data?.meta?.last_page as number;
            lastPage.current = last;
        }
    }, [state]);


    const onClickView = useCallback((e: any, r: D) => {
        if (onView) {
            onView(r);
        }
    }, []);

    const onClickFirst = useCallback((a: any) => {
        setPage((page) => {
            return 1;
        });
    }, []);

    const onClickPrev = useCallback((a: any) => {
        setPage((page) => {
            return page > 1 ? page - 1 : 1;
        });
    }, []);

    const onClickNext = useCallback((a: any) => {
        setPage((page) => {
            return page < lastPage.current ? page + 1 : lastPage.current;
        });
    }, []);

    const onClickLast = useCallback((a: any) => {
        setPage(() => {
            return lastPage.current;
        });
    }, []);

    const firstRow:D = data && data.length > 0 ? data[0] : {} as D;
    const columnNames = cols ? Object.keys(cols) : Object.keys(firstRow.data);
    const columnLabels = cols ? cols : {};

    const tableHeader = columnNames.map((h, i) => {
        return <th key={i}>{columnLabels ? columnLabels[h] : h}</th>
    });

    if (showActions) {
        tableHeader.push(<th key={-1}>Actions</th>);
    }

    const tableRows = data?.map((r, i) => {
        const cells = columnNames
            .map((c, i) => {
                return <td key={i}>{r.data[c]}</td>
            });

        if (showActions) {
            cells.push(<td key={-1}>
                <a className="btn btn-primary" onClick={e => onClickView(e, r)}>View</a>
            </td>);
        }

        return <tr key={i}>
            {cells}
        </tr>
    });

    return (<table className="table table-striped">
        <thead><tr>{tableHeader}</tr></thead>
        <tbody>{tableRows}</tbody>
        <tfoot>
            <tr>
                <td>
                    <a className="btn btn-primary" href="#" onClickCapture={onClickFirst}>first</a>
                    <a className="btn btn-primary" href="#" onClickCapture={onClickPrev}>prev</a>
                    <a className="btn btn-primary" href="#" onClickCapture={onClickNext}>next</a>
                    <a className="btn btn-primary" href="#" onClickCapture={onClickLast}>last</a>
                </td>
            </tr>
        </tfoot>
    </table>)

}

export default Table