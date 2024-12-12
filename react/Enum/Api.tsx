import { ResponseDataInterface } from '@app/Services/DataService';

export const ApiTokenName = 'panel:api';

export enum ApiEndpoint {
  USER_LOGIN = '/api/login',
}

export enum ApiEndpointNames {
  PAGE_LIST = 'app_api_page_list',
  PAGE_STORE = 'app_api_page_store',
  PAGE_UPDATE = 'app_api_page_update',
  PAGE_SHOW = 'app_api_page_show',
}

export interface ApiResource extends ResponseDataInterface {
  data: { [key: string]: string | number };
  links?: { [key: string]: string };
  meta?: { [key: string]: string };
}

export interface ApiResponseToken {
  token: string;
}

export interface ApiPageListResource extends ApiResource {
  data: {
    id: number;
    title: string;
  };
}

export interface ApiPageResource extends ApiResource {
  data: {
    id: number;
    title: string;
    content: string;
  };
  links: { [key: string]: string };
  meta: { [key: string]: string };
}

export interface ApiUserResource extends ApiResource {
  email: string;
  role: string;
}

export interface ApiResponsePageList extends ResponseDataInterface {
  data: ApiPageListResource[];
  links: { [key: string]: string };
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiResponsePage extends ResponseDataInterface {
  data: {
    id: number;
    title: string;
    content: string;
  };
  links: { [key: string]: string };
  meta: { [key: string]: string };
}

export interface ApiResponseUser extends ResponseDataInterface {
  data: ApiUserResource;
  links: {
    [key: string]: string;
  };
  meta: {
    [key: string]: string;
  };
}
