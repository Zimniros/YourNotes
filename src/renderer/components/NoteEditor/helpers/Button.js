/* eslint react/prop-types: 0 */

import React from 'react';

const Button = ({ isActive, children, onMouseDown }) => {
  const className = isActive ? 'toolbar__button toolbar__button--active' : 'toolbar__button';
  return (
    <button onMouseDown={onMouseDown} className={className}>
      {children}
    </button>
  );
};

export default Button;
