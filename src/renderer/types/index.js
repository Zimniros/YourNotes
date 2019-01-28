/* eslint-disable import/prefer-default-export */
import { shape, string } from 'prop-types';

export const folderType = shape({
  id: string.isRequired,
  name: string.isRequired,
});

export const folderDefault = {
  id: '',
  name: '',
};
