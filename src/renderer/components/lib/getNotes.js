import { folderPathnameRegex } from './consts';
import Map from '../../../lib/Map';

function filterTrashed(notes) {
  const data = notes instanceof Map ? notes.toArray() : notes;

  return data.filter(({ isTrashed }) => !isTrashed);
}

function getNotes(pathname, notesData) {
  if (!pathname || !notesData) return null;

  const { allNotes, starredNotes, trashedNotes } = notesData;
  const match = pathname.match(folderPathnameRegex);
  let notes;

  if (pathname === '/starred') {
    notes = starredNotes.map(key => allNotes.get(key));
    return filterTrashed(notes);
  }

  if (pathname === '/trash') {
    return trashedNotes.map(key => allNotes.get(key));
  }

  if (match) {
    notes = allNotes.toArray().filter(({ folder }) => folder === match[1]);
    return filterTrashed(notes);
  }

  return filterTrashed(allNotes);
}

export default getNotes;
