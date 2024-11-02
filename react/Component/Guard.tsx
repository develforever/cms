import AppContext from '@app/AppContext';
import React, { useContext, useEffect, useRef, useState } from 'react';

const Guard: React.FC<any> = ({ children }) => {
  const context = useContext(AppContext);
  let loginRequired = false;

  let subRouter = (state: any) => {
    let path = state.location.pathname;
    console.debug(`guard ${path}`);
    if (!context.isAuthenticated() && !context.token && path !== '/') {
      context.router?.navigate('/');
    }
  };

  let sub: any = useRef(null);

  useEffect(() => {
    if (sub.current) {
      return;
    }
    sub.current = context.router?.subscribe(subRouter);

    subRouter(context.router?.state);
  }, [context.router]);

  return <>{!loginRequired ? children : null}</>;
};

export default Guard;
