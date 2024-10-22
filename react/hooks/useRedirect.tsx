import { useCallback, useRef } from "react";


export default function useRedirect(to: string) {

    const refTo = useRef(to);
    return useCallback(() => {
        globalThis.location.assign(refTo.current);
    }, [to]);
}