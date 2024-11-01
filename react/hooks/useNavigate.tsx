import { useCallback, useRef } from 'react';
import {
  generatePath,
  useNavigate as nav,
  NavigateOptions,
} from 'react-router-dom';

export default function useNavigate(to: string) {
  const navigate = nav();
  const refTo = useRef<string>(to);

  return useCallback(
    (
      params?: { [key: string]: string | number },
      options?: NavigateOptions
    ) => {
      if (params) {
        refTo.current = generatePath(refTo.current, params);
      }

      navigate(refTo.current, options);
    },
    [navigate]
  );
}
