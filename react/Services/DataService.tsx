import AppContext from '@app/AppContext';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import React, { useContext, useReducer } from 'react';

enum ActionType {
  request = 'request',
  success = 'success',
  error = 'error',
}

export enum Status {
  success = 'success',
  error = 'error',
}

export type BaseData = {
  [key: string]: string | number | null | string[] | number[] | any;
};

export interface ResponseDataInterface {
  data: BaseData | BaseData[];
  meta?: { [key: string]: string | number };
  links?: { [key: string]: string };
}

type Response<T extends ResponseDataInterface> =
  | {
      data: T;
      status?: number;
      statusText?: string;
      headers?: { [key: string]: string };
      config?: AxiosRequestConfig;
      request?: axios.AxiosRequestConfig;
      response?: axios.AxiosResponse;
    }
  | axios.AxiosResponse<T>;

export type InitialState<Result extends ResponseDataInterface> = {
  status?: Status;
  url?: string;
  result?: Response<Result> | null;
};

type Action<Result extends ResponseDataInterface> = {
  url?: string;
  data?:
    | {}
    | { [key: string]: string | number | null | string[] | number[] }
    | string
    | null;
  method?: string;
  type?: ActionType;
  result?: Response<Result> | null;
  error?: {
    message: string;
    stack?: string;
    code?: number;
  };
  baseURL?: string;
  timeout?: number;
  headers?: object;
  token?: string;
  params?: { [key: string]: string | number | null };
};

let apiClient: AxiosInstance | null = null;

export function useService() {
  let csrftoken = globalThis.document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');
  const context = useContext(AppContext);
  let headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (context.token) {
    headers['Authorization'] = `Bearer ${context.token}`;
  }
  if (csrftoken) {
    headers['X-CSRF-TOKEN'] = `${csrftoken}`;
  }

  apiClient = axios.create({
    baseURL: '/',
    timeout: 5000,
    headers,
  });
}

async function useFetchData<T extends ResponseDataInterface>(
  url: string,
  action: Action<T>
) {
  if (!apiClient) {
    throw new Error(`Initialize service first`);
  }
  let tmp: AxiosRequestConfig = {
    url: url,
    data: action.data,
    params: action.params,
    method: action.data ? action.method || 'POST' : 'GET',
  };

  if (action.token) {
    tmp.headers = {
      ...tmp.headers,
      Authorization: `Bearer ${action.token}`,
    };
  }

  const result = await apiClient.request<T>(tmp);

  console.debug(`data serive:request: ${url}`);

  return result;
}

function reducer<T extends ResponseDataInterface>(
  state: InitialState<T>,
  action: Action<T>
): InitialState<T> {
  let type: ActionType = action.type || ActionType.request;

  switch (type) {
    case ActionType.success:
      return {
        ...state,
        status: Status.success,
        result: action.result,
        url: action.url,
      };
    case ActionType.error:
      return {
        ...state,
        url: action.url,
        result: action.result,
        status: Status.error,
      };
    default:
      return state;
  }
}

function dispatchMiddleware<T extends ResponseDataInterface>(
  url: string,
  dispatch: React.Dispatch<Action<T>>
) {
  console.debug('dispatch middleware');

  return async (action: Action<T>) => {
    let type: ActionType = action.type || ActionType.request;

    switch (type) {
      case ActionType.request:
        try {
          const result = await useFetchData<T>(url, action);
          dispatch({ ...action, type: ActionType.success, result });
        } catch (e) {
          console.error('data servce error', e);
          dispatch({ ...action, type: ActionType.error, error: e as Error });
        }
        break;

      default:
        dispatch(action);
    }
  };
}

function useDataService<T extends ResponseDataInterface>(
  url: string,
  ...middlewares: ((
    action: React.Dispatch<Action<T>>
  ) => (action: Action<T>) => Promise<void>)[]
): [result: InitialState<T>, dipath: React.Dispatch<Action<T>>] {
  let params: InitialState<T> = {
    url,
  };
  const [result, dispatch] = useReducer<
    (state: InitialState<T>, action: Action<T>) => InitialState<T>
  >(reducer, params);

  let md = dispatch;
  if (middlewares) {
    middlewares.forEach((e) => {
      md = e(md);
    });
  }

  console.debug(`data service: ${url}`);
  return [result, dispatchMiddleware(url, md)] as const;
}

export default useDataService;
