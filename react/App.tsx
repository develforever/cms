import React, { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import AppContext from '@app/AppContext';
import { useService } from './Services/DataService';

function App() {
  console.log('render app');
  useService();

  const context = useContext(AppContext);
  const router = context.router;
  return (
    <div className="app w-100 h-100 q">
      {router && <RouterProvider router={router}></RouterProvider>}
    </div>
  );
}

export default App;
