import { ResponseDataInterface } from '@app/Services/DataService';

export const ApiTokenName = 'panel:api';

export enum ApiEndpoint {
  USER_LOGIN = '/api/login',
}

export interface ApiResource extends ResponseDataInterface {}

export interface ApiResponseToken {
  token: string;
}

export interface ApiPageResource extends ApiResource {
  data: {
    id: number;
    title: string;
    content: string;
  };
}

export interface ApiUserResource extends ApiResource {
  [key: string]: any;
  email: string;
  role: string;
}

export interface ApiPageListResource extends ApiResource {
  [key: string]: any;
  data: {
    id: number;
    title: string;
  };
}

export interface ApiResponsePageList extends ApiResource {
  data: ApiPageListResource[];
  links: { [key: string]: string };
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiResponsePage extends ApiResource {
  data: {
    id: number;
    title: string;
    content: string;
  };
  links: { [key: string]: string };
}

export interface ApiResponseUser extends ApiResource {
  data: ApiUserResource;
  links: {
    [key: string]: string;
  };
}
