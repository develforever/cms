import { Router } from '@remix-run/router';
import { RouteObject } from 'react-router';
import { Subject } from 'rxjs';

export type User = {
  email: string;
  role: string;
};
export type ModalConfig = {
  // todo maybe uuid type
  id: string;
  key: string | number;
};

export type PluginsKeys = 'ModalsPlugin';

export type AppState = {
  title?: string;
  user: null | User;
  modals?: ModalConfig[];
  links?: { [key: string]: string };
  meta?: { [key: string]: string };
  routes: RouteObject[];
  token?: string;
  xcsrf?: string;
  router?: Router;
  isAuthenticated: () => boolean;
  plugin: {
    [key in PluginsKeys]?: Subject<number | string | object>;
  };
  dispatch: (newState: object) => void;
};
