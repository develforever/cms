import React, { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import AppContext from '@app/AppContext';
import { useService } from './Services/DataService';
import Guard from './Component/Guard';

function App() {
  console.log('render app');
  useService();

  const context = useContext(AppContext);
  const router = context.router;
  return (
    <Guard>
      <div className="app w-100 h-100 q">
        {router && <RouterProvider router={router}></RouterProvider>}
      </div>
    </Guard>
  );
}

export default App;
