import Layout, { SlotNames } from '@app/Layout';
import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError() as {
    statusText: string;
    message: string;
    stack: string;
  };
  console.error('error page', error);

  return (
    <>
      <Layout>
        <div data-slot={SlotNames.Center}>
          <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
            <pre>{error.stack}</pre>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ErrorPage;
