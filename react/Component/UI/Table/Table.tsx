import useDataService, {
  BaseData,
  ResponseDataInterface,
  Status,
} from '@app/Services/DataService';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router';

interface TableProps<D> {
  cols?: { [key: string]: string };
  showActions?: boolean;
  onView?: (row: D) => void;
  onEdit?: (row: D) => void;
  url?: string;
  customActions?: ReactElement | ReactElement[];
}

const Table = <
  D extends ResponseDataInterface,
  R extends ResponseDataInterface,
>({
  url = undefined,
  showActions = true,
  cols = {},
  onView = undefined,
  onEdit = undefined,
  customActions = undefined,
}: TableProps<D>): React.ReactElement => {
  if (!url) {
    return <></>;
  }

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [page, setPage] = useState<number>(+(queryParams.get('page') || '1'));
  const [state, dispatch] = useDataService<R>(url);
  const [isLoading, setIsLoading] = useState(false);

  const updateQueryParam = useCallback(
    (key: string, value: string) => {
      queryParams.set(key, value);
      navigate(`${location.pathname}?${queryParams.toString()}`);
    },
    [location.pathname, navigate, queryParams]
  );

  const data: D[] =
    state.result?.data?.data && state.result?.data?.data.length > 0
      ? (state.result?.data?.data as D[])
      : [];
  const total: number = state.result?.data?.meta?.total as number;
  const totalPages: number = state.result?.data?.meta?.total_pages as number;

  let lastPage = useRef(1);

  const memoDispatch = useCallback(() => {
    setIsLoading(true);
    dispatch({
      method: 'GET',
      params: {
        page,
      },
    });
  }, [page]);

  useEffect(() => {
    updateQueryParam('page', `${page}`);
    memoDispatch();
  }, [page]);

  useEffect(() => {}, [location.search]);

  useEffect(() => {
    if (state.status === Status.success) {
      // @ts-ignore
      let last: number = state.result?.data?.meta?.total_pages as number;
      lastPage.current = last;
      setIsLoading(false);
    }
  }, [state]);

  const onClickView = useCallback(
    (r: D) => {
      if (onView) {
        onView(r);
      }
    },
    [onView]
  );

  const onClickEdit = useCallback(
    (r: D) => {
      if (onEdit) {
        onEdit(r);
      }
    },
    [onEdit]
  );

  const onClickFirst = useCallback(() => {
    setPage(() => {
      return 1;
    });
  }, []);

  const onClickPrev = useCallback(() => {
    setPage((page) => {
      return page > 1 ? page - 1 : 1;
    });
  }, []);

  const onClickNext = useCallback(() => {
    setPage((page) => {
      return page < lastPage.current ? page + 1 : lastPage.current;
    });
  }, []);

  const onClickLast = useCallback(() => {
    setPage(() => {
      return lastPage.current;
    });
  }, []);

  const firstRow: D = data && data.length > 0 ? data[0] : ({} as D);
  const columnNames = cols ? Object.keys(cols) : Object.keys(firstRow.data);
  const columnLabels = cols ? cols : {};

  columnNames.unshift('lp');

  const tableHeader = columnNames.map((h, i) => {
    return (
      <th key={i}>{columnLabels && columnLabels[h] ? columnLabels[h] : h}</th>
    );
  });

  if (showActions) {
    tableHeader.push(
      <th className="text-end" key={-1}>
        Actions
      </th>
    );
  }

  function* lpGenerator(end: number = 1) {
    for (let i = 1; i <= end; i++) {
      yield i;
    }
  }

  let lp = lpGenerator(data?.length || 0);

  const tableRows = data?.map((r: D, i) => {
    const cells = columnNames.map((c, i) => {
      // @ts-ignore
      let cellValue = r.data[c];

      if (!cellValue && 'lp' === c) {
        cellValue = lp.next().value;
      }

      return <td key={i}>{cellValue}</td>;
    });

    if (showActions) {
      cells.push(
        <td className="text-end" key={-1}>
          <a className="btn btn-primary" onClick={() => onClickView(r)}>
            View
          </a>
          <a className="btn btn-secondary" onClick={() => onClickEdit(r)}>
            Edit
          </a>
        </td>
      );
    }

    return <tr key={i}>{cells}</tr>;
  });

  return (
    <div className="border rounded p-2 ms-1 me-1">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>{tableHeader}</tr>
        </thead>
        {customActions && (
          <thead>
            <tr>
              <th colSpan={tableHeader.length}>{customActions}</th>
            </tr>
          </thead>
        )}
        <tbody>
          {!isLoading && tableRows}
          {isLoading && (
            <tr>
              <td colSpan={tableHeader.length}>
                <div>Loading ...</div>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={tableHeader.length}>
              <a
                className="btn btn-primary"
                href="#"
                onClickCapture={onClickFirst}
              >
                first
              </a>
              <a
                className="btn btn-primary"
                href="#"
                onClickCapture={onClickPrev}
              >
                prev
              </a>
              <span className="p-1">
                page {page} of {totalPages} | total items: {total}
              </span>
              <a
                className="btn btn-primary"
                href="#"
                onClickCapture={onClickNext}
              >
                next
              </a>
              <a
                className="btn btn-primary"
                href="#"
                onClickCapture={onClickLast}
              >
                last
              </a>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
