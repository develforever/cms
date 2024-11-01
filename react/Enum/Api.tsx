import { ResponseDataInterface } from "@app/Services/DataService";


export const ApiTokenName = 'panel:api';

export enum ApiEndpoint {
    USER_LOGIN = "/api/login",
};

export enum ApiEndpointNames {
    PAGE_LIST = "app_api_page_list",
    PAGE_STORE = "app_api_page_store",
    PAGE_UPDATE = "app_api_page_update",
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
    email: string;
}

export type ApiResponsePageList = {
    data: ApiPageResource[],
    links: { [key: string]: string },
    meta: {
        current_page: number,
        per_page: number,
        total: number,
        total_pages: number
    }
};

export interface ApiResponseUser extends ResponseDataInterface {
    data: ApiUserResource,
    links: {
        [key: string]: string
    },
    meta: {
        [key: string]: string
    }
};

export interface ApiResponseToken extends ApiResource {
    token: string
};