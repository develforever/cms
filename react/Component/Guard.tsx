import AppContext from '@app/AppContext';
import useLocalStorage from '@app/Services/LocalStorage';
import useUserAuth from '@app/Services/UserAuth';
import React, { useContext, useEffect, useRef, useState } from 'react';

const Guard: React.FC<any> = ({ children }) => {
  const context = useContext(AppContext);
  let sub: any = useRef(null);

  let [loginRequired, setLoginRequired] = useState<boolean | null>(null);

  let subRouter = (state: any) => {
    let path = state.location.pathname;
    console.debug(`guard ${path}`);
    if (!context.isAuthenticated() && !context.token && path !== '/') {
      setLoginRequired(true);
    }
  };

  useEffect(() => {
    if (sub.current) {
      return;
    }
    sub.current = context.router?.subscribe(subRouter);

    subRouter(context.router?.state);
  }, [context.router]);

  useEffect(() => {
    if (context.token && !context.isAuthenticated()) {
      setLoginRequired(true);
    }
  }, [context.token]);

  return (
    <>
      {loginRequired === false ? (
        <div>
          <p>Login required</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Guard;
