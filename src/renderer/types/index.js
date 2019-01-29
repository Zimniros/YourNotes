/* eslint-disable import/prefer-default-export */
import {
  shape, string, arrayOf, bool,
} from 'prop-types';

export const folderType = shape({
  id: string.isRequired,
  name: string.isRequired,
});

export const folderDefault = {
  id: '',
  name: '',
};

export const noteType = shape({
  key: string.isRequired,
  title: string.isRequired,
  content: string.isRequired,
  createdAt: string.isRequired,
  updatedAt: string.isRequired,
  folder: string.isRequired,
  tags: arrayOf(string).isRequired,
  isStarred: bool.isRequired,
  isTrashed: bool.isRequired,
});

export const noteDefault = {
  key: '',
  title: '',
  content: '',
  createdAt: '',
  updatedAt: '',
  folder: '',
  tags: [],
  isStarred: false,
  isTrashed: false,
};
