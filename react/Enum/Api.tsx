import { ResponseDataInterface } from "@app/Services/DataService";


export const ApiTokenName = 'panel:api';

export enum ApiEndpointNames {
    PAGE_STORE = "/api/page/store",
    PAGE_LIST = "/api/page/list",
};

export interface ApiResource extends ResponseDataInterface {
    data: { [key: string]: string | number },
    links?: { [key: string]: string }
    meta?: { [key: string]: string }
}

export interface ApiPageResource extends ApiResource {
    data: {
        autor_user_id: number,
        created_at: string,
        updated_at: string,
        id: number,
        title: string
    },
}

export interface ApiUserResource extends ApiResource {
    data: {
        id: number;
        name: string;
        role: string;
        email: string;
        email_verified_at: string;
        created_at: string;
        updated_at: string;
        deleted_at: string;
    },
}

export type ApiResponsePageList = {
    data: ApiPageResource[],
    links: {
        self: string,
        first: string,
        last: string,
        prev: string,
        next: string
    },
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: any[],
        path: string,
        per_page: number,
        to: number,
        total: number
    }
};

export type ApiResponseUser = {
    data: ApiUserResource,
    links: {
        [key: string]: string
    },
    meta: {
        [key: string]: string
    }
};

export type ApiResponseToken = {
    token: string
};