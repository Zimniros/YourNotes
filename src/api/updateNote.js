const { isArray, isString } = require('lodash');
const v4 = require('uuid/v4');

const db = require('./db');

function validateInput(input) {
  const validatedInput = {};

  if (input.tags != null) {
    validatedInput.tags = !isArray(input.tags) ? [] : input.tags;
  }

  if (input.title != null) {
    validatedInput.title = !isString(input.title) ? '' : input.title;
  }

  if (input.isStarred != null) {
    validatedInput.isStarred = !!input.isStarred;
  }

  if (input.isTrashed != null) {
    validatedInput.isTrashed = !!input.isTrashed;
  }

  if (input.value != null) {
    validatedInput.value = !isString(input.value) ? '' : input.value;
  }

  return validatedInput;
}

async function updateNote(noteKey, input) {
  if (input === null) {
    return Promise.reject(new Error('No input found.'));
  }

  let targetNote;

  if (noteKey !== null) {
    try {
      targetNote = await db.notes.findOne({ key: noteKey });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const validatedInput = validateInput(input);

  const noteData = targetNote || {
    key: v4(),
    title: '',
    value: '',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    folder: '',
    tags: [],
    isStarred: false,
    isTrashed: false
  };

  if (
    noteData.title !== validatedInput.title ||
    noteData.value !== validatedInput.value
  ) {
    validatedInput.updatedAt = new Date().getTime();
  }

  const data = Object.assign({}, noteData, validatedInput);

  try {
    await db.notes.update({ key: noteData.key }, data);
  } catch (error) {
    return Promise.reject(error);
  }

  return data;
}

module.exports = updateNote;
