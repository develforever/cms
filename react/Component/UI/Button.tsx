import React from 'react';

const Button: React.FC<{
  title: string;
  className: string;
  onClick?: () => void;
}> = ({ title, className, onClick }) => {
  function onClickBtn() {
    onClick ? onClick() : null;
  }

  return (
    <button
      className={`btn${className ? ` ${className}` : ''}`}
      onClick={onClickBtn}
      type="button"
    >
      {title}
    </button>
  );
};

export default Button;
