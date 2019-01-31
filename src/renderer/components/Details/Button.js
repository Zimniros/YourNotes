/* eslint react/prop-types: 0 */

import React from 'react';

const Button = ({
  isActive, children, onMouseDown, isDisabled,
}) => {
  const className = isActive ? 'toolbar__button toolbar__button--active' : 'toolbar__button';

  return (
    <button type="button" onMouseDown={onMouseDown} className={className} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
