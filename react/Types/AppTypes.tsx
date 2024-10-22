import { RouteObject } from "react-router"
import { Subject } from "rxjs"

export type User = {
    username: string
    role: string,
}
export type ModalConfig = {
    // todo maybe uuid type
    id: string,
    key: any
}

export type PluginsKeys = "ModalsPlugin";

export type AppState = {
    title?: string,
    user: null | User,
    modals?: ModalConfig[],
    links?: { [key: string]: string },
    routes: RouteObject[],
    token?: string,
    xcsrf?: string,
    router: any,
    isAuthenticated: () => boolean,
    plugin: {
        [key in PluginsKeys]?: Subject<number | string | {}>
    },
    dispatch: Function,
}