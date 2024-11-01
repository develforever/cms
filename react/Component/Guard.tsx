import AppContext from '@app/AppContext';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useNavigation } from 'react-router-dom';

const Guard: React.FC<any> = ({ children }) => {
  const context = useContext(AppContext);

  const nav = useNavigation();

  let subRouter = useCallback(
    (state: any) => {
      console.log({ ...state }, nav);
    },
    [nav]
  );

  let sub: any = useRef(null);

  useEffect(() => {
    console.log(context.isAuthenticated);
    if (sub.current) {
      return;
    }
    console.log('route changed', context);

    sub.current = context.router?.subscribe(subRouter);
  }, [context, subRouter]);

  console.log(context.isAuthenticated);
  return <>{context.isAuthenticated() ? children : null}</>;
};

export default Guard;
