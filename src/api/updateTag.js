import { isEmpty, isString } from 'lodash';

import db from './db';

async function updateTag(tag) {
  if (isEmpty(tag)) {
    return Promise.reject(new Error('No input found.'));
  }

  const { id, name } = tag;

  if (!isString(name)) {
    return Promise.reject(new Error('Name must be a string.'));
  }

  if (name < 1) {
    return Promise.reject(new Error('Name must be at least 1 character long.'));
  }

  const targetTag = await db.tags.findOne({ name });

  if (targetTag) {
    return Promise.reject(
      new Error(`A tag with the name '${name}' already exists.`)
    );
  }

  await db.tags.update({ id }, tag);

  return Promise.resolve(tag);
}

export default updateTag;
