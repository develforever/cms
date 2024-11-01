import React, { useEffect } from 'react';

const Redirect: React.FC<{ to: string }> = ({ to }) => {
  useEffect(() => {
    globalThis.location.assign(to);
  }, [to]);

  return <></>;
};

export default Redirect;
