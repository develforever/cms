import React from 'react';
import { createRoot } from 'react-dom/client';
import { InitialConfig } from '@app/Types/AppTypes';
import '@app/css/bootstrap.css';
import '@app/css/app.css';
import '@app/css/theme1.css';

const Root: React.FC<{ initConfig?: InitialConfig }> = ({ initConfig }) => {
  console.log('docs render', initConfig);

  return (
    <div className="d-flex flex-column">
      <div>
        <h2>{initConfig?.title} - documentation</h2>
      </div>
      <div>
        <input className='form-control' type='search' placeholder='...start typing for search'/>
      </div>
    </div>
  );
};

export default function (params: any) {
  const node = document.querySelector('#root.has-app');
  if (node) {
    const root = createRoot(node);
    root.render(<Root initConfig={params}></Root>);
  }
}
