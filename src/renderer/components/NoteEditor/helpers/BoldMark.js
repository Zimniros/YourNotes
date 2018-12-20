import React from 'react';

const BoldMark = ({ attributes, children }) => (
  <strong {...attributes}>{children}</strong>
);

export default BoldMark;
