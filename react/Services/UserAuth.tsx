import AppContext from '@app/AppContext';
import { ApiResponseUser } from '@app/Enum/Api';
import useDataService, { Status } from '@app/Services/DataService';
import { useCallback, useContext, useEffect } from 'react';

function useUserAuth() {
  const context = useContext(AppContext);
  const [stateUser, dispatchUser] =
    useDataService<ApiResponseUser>('/api/user');

  let userCallback = useCallback(async () => {
    dispatchUser({});
  }, []);

  useEffect(() => {
    if (stateUser.status === Status.success) {
      let user = stateUser.result?.data.data;
      let links = stateUser.result?.data.links;
      let meta = stateUser.result?.data.meta;

      context.dispatch({ user, links, meta });
    }
  }, [stateUser]);

  return [userCallback] as const;
}

export default useUserAuth;
