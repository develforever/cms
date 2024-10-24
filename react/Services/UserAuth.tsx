import AppContext from "@app/AppContext";
import { ApiResponseToken, ApiResponseUser, ApiTokenName } from "@app/Enum/Api";
import { RouteNames } from "@app/Enum/Route";
import useRedirect from "@app/hooks/useRedirect";
import useDataService, { Status } from "@app/Services/DataService";
import { useCallback, useContext, useEffect, useRef } from "react";


function useUserAuth() {

    console.debug('user:auth');

    const context = useContext(AppContext);
    const [stateToken, dispatchTokenCreate] = useDataService<ApiResponseToken>('/api/login');
    const [stateUser, dispatchUser] = useDataService<ApiResponseUser>('/api/user');

    let tokenCallback = useCallback(async (email: string, password: string) => {
        dispatchTokenCreate({ data: { email, password } });
    }, []);

    let userCallback = useCallback(async () => {
        dispatchUser({});
    }, []);

    useEffect(() => {
        if (stateUser.status === Status.success) {
            let user = stateUser.result?.data;
            if (user?.data.email) {
                // @ts-ignore
                user.username = user?.data.email;
            }
            let links = stateUser.result?.data.links;

            context.dispatch({ user, links });
        }
    }, [stateUser.status]);

    return [tokenCallback, userCallback] as const;

}

export default useUserAuth;