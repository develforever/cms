interface StorageItem {
  expire: number;
  created: number;
  value: string | number | object | null;
}

function useLocalStorage() {
  const storage = globalThis.localStorage;

  const get = (key: string) => {
    let item = JSON.parse(`${storage.getItem(key)}`) as StorageItem;

    if (!item) {
      return null;
    }

    let expire = item.expire;
    if (expire < Date.now()) {
      return null;
    }
    let value = item.value;

    return value;
  };

  const set = (key: string, value: string | number | object | null) => {
    let data = JSON.stringify({
      created: Date.now(),
      expire: Date.now() + 1000 * 3600,
      value,
    });
    storage.setItem(key, data);
  };

  const del = (key: string) => {
    console.debug(`delete: ${key}`);
    storage.removeItem(key);
  };

  return [get, set, del] as const;
}

export default useLocalStorage;
