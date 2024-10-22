import { Dispatch, SetStateAction, useState } from "react";
import { AppState, PluginsKeys, User } from "@app/Types/AppTypes";
import router, { routes } from "@app/Router";
import { AppStatePluginInterface } from "@app/AppState/Plugin/AppStatePluginInterface";
import ModalsPlugin from "@app/AppState/Plugin/ModalsPlugin";
import { Subject } from "rxjs";
import * as Home from "@app/Pages/Home";
import * as Page from "@app/Pages/Page";
import * as Account from "@app/Pages/Account";

let panelsRoutes = [
    ...Home.getRoutes(),
    ...Page.getRoutes(),
    ...Account.getRoutes(),
];

let [state, setState]: [AppState, React.Dispatch<React.SetStateAction<AppState>>] = [{} as AppState, () => { }] as const;
let statePlugins: AppStatePluginInterface[] = [];

function useAppStateInit(): [AppState, React.Dispatch<React.SetStateAction<AppState>>] {

    [state, setState] = useState<AppState>(() => {

        console.debug('app state create');

        const routeValues = routes(panelsRoutes);
        const routerObject = router(routeValues);
        let initialValues: AppState = {
            title: "CMS Panel",
            user: null,
            routes: routeValues,
            router: routerObject,
            xcsrf: globalThis.document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
            isAuthenticated: () => {
                return state.user !== null;
            },
            plugin: {
            },
            dispatch: (newState: any) => {
                stateSubject.next(newState);
            },
        } as AppState;

        const initValuesSubject = new Subject<{}>();
        initValuesSubject.subscribe((v) => {
            initialValues = { ...initialValues, ...v };
        });

        statePlugins.push(new ModalsPlugin());

        const stateSubject = new Subject<{}>();
        stateSubject.subscribe((v) => {
            setState({ ...state, ...v });
        });

        statePlugins
            .forEach((plgConf) => {

                let plgName = plgConf.constructor.name as PluginsKeys;
                initialValues.plugin[plgName] = new Subject<number | string | object>()
                plgConf.initialize(initValuesSubject, initialValues.plugin[plgName], stateSubject);
            });

        return initialValues;
    });

    return [state, setState];

}

export default useAppStateInit