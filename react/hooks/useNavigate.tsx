
import React, { useCallback, useRef } from "react";
import { generatePath, useNavigate as nav, NavigateOptions } from "react-router-dom";

export default function useNavigate(to: string) {

    const navigate = nav();
    const refTo = useRef<string>(to);

    return useCallback((params?: any, options?: NavigateOptions) => {

        if (params) {
            refTo.current = generatePath(refTo.current, params);
        }

        navigate(refTo.current, options);
    }, [to]);
}