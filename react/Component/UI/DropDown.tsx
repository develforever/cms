import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";


const DropDown: React.FC<{ title: string, children: any }> = ({ title, children }) => {

    console.debug(`render dropdown`);
    let refNode = useRef(null);

    const [state, setState] = useState({
        isOpen: false,
    });

    function open() {
        setState((state) => {
            return { ...state, isOpen: true }
        });
    }
    function close() {
        setState((state) => {
            return { ...state, isOpen: false }
        });
    }
    function onClick() {
        open();
    }

    let mainHandler = useCallback((e) => {

        if (e.target.className.indexOf('dropdown-toggle') === -1
            && e.target.className.indexOf('dropdown-item') === -1) {
            close();
        }
    }, []);

    useEffect(() => {

        globalThis.document.addEventListener('mousedown', mainHandler);
        return () => {
            globalThis.document.removeEventListener('mousedown', mainHandler);
        };
    }, []);


    return <div className="btn-group dropstart">
        <Button title={title} className={`btn-secondary dropdown-toggle${state.isOpen ? ' show' : ''}`} onClick={onClick}></Button>
        <ul className={`dropdown-menu${state.isOpen ? ' show' : ''}`} style={{ top: '100%' }}>
            {children}
        </ul>
    </div>
}

export default DropDown;