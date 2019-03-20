import v4 from 'uuid/v4';
import { isString } from 'lodash';

import db from './db';

async function addTag(name) {
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

  const newTag = {
    id: v4(),
    name
  };

  await db.tags.insert(newTag);

  return newTag;
}

export default addTag;
