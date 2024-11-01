import { useCallback } from 'react';

interface StorageItem {
  expire: number;
  created: number;
  value: string | number | object | null;
}

function useLocalStorage() {
  const storage = globalThis.localStorage;

  const get = useCallback(
    (key: string) => {
      console.debug(`get: ${key}`);

      let item = JSON.parse(`${storage.getItem(key)}`) as StorageItem;

      let value = item?.value;

      return value;
    },
    []
  );

  const set = useCallback(
    (key: string, value: string | number | object | null) => {
      let data = JSON.stringify({
        created: Date.now(),
        expire: Date.now() + 1000 * 3600,
        value,
      });
      console.debug(`set: ${key} => ${value}`);
      console.debug('set run');
      storage.setItem(key, data);
    },
    []
  );

  const del = useCallback(
    (key: string) => {
      console.debug(`delete: ${key}`);
      storage.removeItem(key);
    },
    []
  );

  return [get, set, del] as const;
}

export default useLocalStorage;
