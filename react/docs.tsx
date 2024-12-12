import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { InitialConfig } from '@app/Types/AppTypes';
import '@app/css/bootstrap.css';
import '@app/css/app.css';
import '@app/css/theme1.css';
import docblocs from '../public/js/docblocks.json';

// @ts-nocheck
let index = {};

type AppInputChangeEvent = {
  target: {
    value: string;
  };
};

const Root: React.FC<{ initConfig?: InitialConfig }> = ({ initConfig }) => {
  let [filtered, setFiltered] = useState(docblocs);
  const [text, setText] = useState('');

  const handleInputChange = (event: AppInputChangeEvent) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setFiltered(
      docblocs.filter((e) => {
        return (
          e.docblock.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !==
          -1
        );
      })
    );
  }, [text]);

  const trs = filtered.map((e, i) => {
    return (
      <tr key={i}>
        <td>
          <pre>{e.docblock}</pre>
          <sub>{e.file}</sub>
        </td>
      </tr>
    );
  });

  return (
    <div className="d-flex flex-column">
      <div>
        <h2>{initConfig?.title} - documentation</h2>
      </div>
      <div>
        <input
          value={text}
          onChange={handleInputChange}
          className="form-control"
          type="search"
          placeholder="...start typing for search"
        />
      </div>
      <div className="pt-2">
        <table className="table table-primary">
          <thead>
            <tr>
              <th>Doc</th>
            </tr>
          </thead>
          <tbody>{trs}</tbody>
        </table>
      </div>
    </div>
  );
};

export default function (params: InitialConfig) {
  const node = document.querySelector('#root.has-app');
  if (node) {
    const root = createRoot(node);
    root.render(<Root initConfig={params}></Root>);
  }
}
