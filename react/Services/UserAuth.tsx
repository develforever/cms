import AppContext from "@app/AppContext";
import { ApiResponseToken, ApiResponseUser, ApiTokenName } from "@app/Enum/Api";
import { RouteNames } from "@app/Enum/Route";
import useRedirect from "@app/hooks/useRedirect";
import useDataService, { Status } from "@app/Services/DataService";
import { useContext, useEffect, useRef } from "react";


function useUserAuth() {

    console.debug('user:auth');

    const context = useContext(AppContext);
    const [stateToken, dispatchTokenCreate] = useDataService<ApiResponseToken>('/user/token/create');
    const [stateUser, dispatchUser] = useDataService<ApiResponseUser>('/api/user');
    const redirect = useRedirect(RouteNames.HOME);

    useEffect(() => {
        console.debug('user:auth:dispatch1');
        if (!context.token) {
            dispatchTokenCreate({ baseURL: '', data: { token_name: ApiTokenName } })
        }
    }, []);

    useEffect(() => {

        console.debug('user:auth:ue:token', stateToken.status);

        if (stateToken.status === Status.success) {
            context.dispatch({ token: stateToken.result?.data.token });
        }
        else if (stateToken.status === Status.error) {
            if (stateToken.result?.response?.status === 401) {
                redirect();
            }


            // context.plugin.ModalsPlugin.next({
            //     event: ModalsPluginEvent.ADD,
            //     data: {
            //         title: "Modal my title",
            //         onClose: () => {
            //             console.log("modal close listener");
            //         },
            //         onOk: () => {
            //             console.log("modal ok listener");
            //         },
            //         onCancel: () => {
            //             console.log("modal cancel listener");
            //         }
            //     } as ModalProps
            // } as ModalPluginEvent);
        }
    }, [stateToken.status]);

    useEffect(() => {

        if (stateUser.status === Status.success) {

            let user = stateUser.result?.data.data;
            if (user) {
                // @ts-ignore
                user.username = stateUser.result?.data?.data?.email;
            }
            let links = stateUser.result?.data.links;
            context.dispatch({ user, links });
        }

    }, [stateUser.status]);

    useEffect(() => {
        if (context.token && !context.isAuthenticated()) {
            dispatchUser({});
        }
    }, [
        context.token
    ]);

}

export default useUserAuth;