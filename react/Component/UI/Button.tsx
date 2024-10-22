import React, { useState } from "react";


const Button: React.FC<{ title: string, className: String, onClick?: () => void }> = ({ title, className, onClick }) => {

    const [state, setState] = useState({
        isOpen: false,
    });

    function onClickBtn() {

        setState((state) => {
            return { ...state, isOpen: !state.isOpen }
        });
        onClick ? onClick() : null;
    }


    return <button className={`btn${className ? ` ${className}` : ''}`} onClick={onClickBtn} type="button">{title}</button>
}

export default Button;