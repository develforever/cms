import AppContext from '@app/AppContext';
import { RouteNames } from '@app/Enum/Route';
import useLocalStorage from '@app/Services/LocalStorage';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Guard: React.FC<any> = ({ children }) => {
  const context = useContext(AppContext);
  let sub: any = useRef(null);
  const [get, set, del] = useLocalStorage();

  let [loginRequired, setLoginRequired] = useState<boolean | null>(null);

  let subRouter = (state: any) => {
    let path = state.location.pathname;
    let token = get('token');
    if (
      (!token || (!context.isAuthenticated() && !context.token)) &&
      [RouteNames.HOME, RouteNames.LOGIN].indexOf(path) === -1
    ) {
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
    let path = globalThis.location.pathname;
    if (
      context.token &&
      !context.isAuthenticated() &&
      [RouteNames.HOME, RouteNames.LOGIN]
        .map((e: RouteNames) => {
          return `${e}`;
        })
        .indexOf(path) === -1
    ) {
      setLoginRequired(true);
    }
  }, [context.token]);

  return (
    <>
      {loginRequired === true ? (
        <div className="p-4">
          <p>
            <a href={RouteNames.LOGIN}>Login</a>
          </p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Guard;
