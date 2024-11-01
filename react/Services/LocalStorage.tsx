import AppContext from "@app/AppContext";
import { ApiResponseToken, ApiResponseUser, ApiTokenName } from "@app/Enum/Api";
import useDataService, { Status } from "@app/Services/DataService";
import { useCallback, useContext, useEffect, useMemo, useRef } from "react";


function useLocalStorage() {


    const storage = globalThis.localStorage;

    const get = useCallback((key: string, ...args: any) => {
        console.debug(`get: ${key}`);
        return storage.getItem(key)

    }, []);

    const set = useCallback((key: string, value: any, ...args: any) => {
        console.debug(`set: ${key} => ${value}`);
        if (get(key) !== value) {
            console.debug('set run');
            storage.setItem(key, value);
        }
    }, []);

    const del = useCallback((key: string, ...args: any) => {
        console.debug(`delete: ${key}`);
        storage.removeItem(key);
    }, []);

    return [get, set, del] as const;

}

export default useLocalStorage;