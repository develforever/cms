'use strict';

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@app/App';
import Modals from '@app/Modals';
import AppContext from '@app/AppContext';
import useAppStateInit from '@app/AppState';

import '@app/css/bootstrap.css';
import '@app/css/app.css';
import '@app/css/theme1.css';
import { InitialConfig } from '@app/Types/AppTypes';

const Root: React.FC<{ initConfig?: InitialConfig }> = ({ initConfig }) => {
  console.log('root render');

  const [state] = useAppStateInit(initConfig || {});

  useEffect(() => {
    console.log('root auth');

    // todo testing purposes
    // make authenticated
    // setState((state) => {
    //     return { ...state, user: { username: "asdasdasd" } }
    // });

    //
    // setTimeout(() => {
    //     state.plugin.ModalsPlugin.next({
    //         event: ModalsPluginEvent.ADD,
    //         data: {
    //             title: "Modal my title",
    //             onClose: () => {
    //                 console.log("modal close listener");
    //             },
    //             onOk: () => {
    //                 console.log("modal ok listener");
    //             },
    //             onCancel: () => {
    //                 console.log("modal cancel listener");
    //             }
    //         } as ModalProps
    //     } as ModalPluginEvent);
    // }, 1000);
  }, []);

  return (
    <>
      <AppContext.Provider value={state}>
        <App key="app"></App>
        <Modals key="modal"></Modals>
      </AppContext.Provider>
    </>
  );
};

export default function (initConfig: InitialConfig) {
  const node = document.querySelector('#root.has-app');
  if (node) {
    const root = createRoot(node);
    root.render(<Root initConfig={initConfig}></Root>);
  }
}
