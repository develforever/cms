import AppContext from "@app/AppContext";
import { ApiResponseToken, ApiResponseUser, ApiTokenName } from "@app/Enum/Api";
import { RouteNames } from "@app/Enum/Route";
import useRedirect from "@app/hooks/useRedirect";
import useDataService, { Status } from "@app/Services/DataService";
import { useCallback, useContext, useEffect, useRef } from "react";


function useUserAuth() {

    const context = useContext(AppContext);
    const [stateUser, dispatchUser] = useDataService<ApiResponseUser>('/api/user');

    let userCallback = useCallback(async () => {
        dispatchUser({});
    }, []);

    useEffect(() => {
        if (stateUser.status === Status.success) {
            let user = stateUser.result?.data.data;
            let links = stateUser.result?.data.links;
            let meta = stateUser.result?.data.meta;

            context.dispatch({ user, links, meta,});
        }
    }, [stateUser.status]);

    return [userCallback] as const;

}

export default useUserAuth;