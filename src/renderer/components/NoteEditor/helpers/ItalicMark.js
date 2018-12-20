import React from 'react';

const ItalicMark = ({ attributes, children }) => (
  <em {...attributes}>{children}</em>
);

export default ItalicMark;
