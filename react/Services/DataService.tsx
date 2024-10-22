import AppContext from '@app/AppContext';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ReadVResult } from 'fs';
import React, { Reducer, useCallback, useContext, useReducer } from 'react';

enum ActionType {
    request = "request",
    success = "success",
    error = "error",
}

export enum Status {
    success = "success",
    error = "error",
}

export interface ResponseDataInterface {
    data: any
}

type Response<T extends ResponseDataInterface> = {
    data: T;
    status: number;
    statusText: string;
    headers: { [key: string]: string };
    config: AxiosRequestConfig;
    request: any;
    response: any;
}

export type InitialState<Result extends ResponseDataInterface> = {
    status?: Status,
    url?: string,
    result?: Response<Result> | null
};

type Action = {
    url?: string,
    data?: any,
    method?: string,
    type?: ActionType,
    result?: any
    baseURL?: string,
    timeout?: number,
    headers?: {},
    token?: string,
    params?: any,
};


let apiClient: AxiosInstance | null = null;

export function useService() {

    const context = useContext(AppContext);

    apiClient = axios.create({
        baseURL: '/',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${context.token}`,
            'X-CSRF-TOKEN': globalThis.document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        }
    });
};

async function useFetchData(url: string, action: Action) {

    if (!apiClient) {
        throw new Error(`Initialize service first`);
    }
    let tmp: AxiosRequestConfig = {
        url: url,
        data: action.data,
        params: action.params,
        method: action.data ? action.method || "POST" : "GET"
    };

    if (action.token) {

        tmp.headers = {
            ...tmp.headers,
            Authorization: `Bearer ${action.token}`
        };
    }


    const result = await apiClient.request(tmp);

    console.debug(`data serive:request: ${url}`);

    return result;
}

function reducer<T extends ResponseDataInterface>(state: InitialState<T>, action: Action): InitialState<T> {

    let type: ActionType = action.type || ActionType.request;

    switch (type) {

        case ActionType.success:
            return {
                ...state,
                status: Status.success,
                result: action.result,
                url: action.url
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

function dispatchMiddleware(url: string, dispatch: React.Dispatch<Action>) {

    console.debug('dispatch middleware');

    return async (action: Action) => {

        let type: ActionType = action.type || ActionType.request;

        switch (type) {
            case ActionType.request:
                try {
                    const result = await useFetchData(url, action);
                    dispatch({ ...action, type: ActionType.success, result });
                } catch (e) {
                    console.error('data servce error', e);
                    dispatch({ ...action, type: ActionType.error, result: e });
                }
                break;

            default:
                dispatch(action);
        }
    };
}


function useDataService<T extends ResponseDataInterface>(url: string, ...middlewares: ((action: React.Dispatch<Action>) => (action: Action) => Promise<void>)[]): [result: InitialState<T>, dipath: React.Dispatch<Action>] {

    let params: InitialState<T> = {
        url,
    };
    const [result, dispatch] = useReducer<(state: InitialState<T>, action: Action) => InitialState<T>>(
        reducer,
        params
    );

    let md = dispatch;
    if (middlewares) {
        middlewares.forEach((e) => {
            md = e(md);
        });
    }

    console.debug(`data service: ${url}`);
    return [result, useCallback(dispatchMiddleware(url, md), [result, dispatch])] as const;
}

export default useDataService;