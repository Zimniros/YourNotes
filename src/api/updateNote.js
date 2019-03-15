import fs from "fs";
import path from "path";
import { isEmpty } from "lodash";

import consts from "./consts";
import { noteDefault } from "./../types";

function updateNote(note) {
  if (isEmpty(note)) {
    return Promise.reject(new Error("No input found."));
  }

  let noteData;
  const { key } = note;
  const notePath = path.join(consts.NOTES_PATH, `${key}.json`);

  try {
    noteData = JSON.parse(fs.readFileSync(notePath));
  } catch (error) {
    console.warn("Can't find note json file.", error);
    noteData = noteDefault;
  }

  if (noteData.title !== note.title || noteData.value !== note.value) {
    noteData.updatedAt = new Date().getTime();
  }

  Object.assign(noteData, note);

  const data = JSON.stringify(Object.assign({}, noteData));
  fs.writeFileSync(notePath, data);

  return Promise.resolve(noteData);
}

export default updateNote;
