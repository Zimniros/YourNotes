import { folderPathnameRegex, tagPathnameRegex } from './consts';
import Map from '../../../lib/Map';

function filterTrashed(notes) {
  const data = notes instanceof Map ? notes.toArray() : notes;

  return data.filter(({ isTrashed }) => !isTrashed);
}

function getNotes(pathname, notesData) {
  if (!pathname || !notesData) return null;

  const { allNotes, starredNotes, trashedNotes } = notesData;
  const folderMatch = pathname.match(folderPathnameRegex);
  const tagMatch = pathname.match(tagPathnameRegex);

  let notes;

  if (pathname === '/starred') {
    notes = starredNotes.map(key => allNotes.get(key));
    return filterTrashed(notes);
  }

  if (pathname === '/trash') {
    return trashedNotes.map(key => allNotes.get(key));
  }

  if (folderMatch) {
    notes = allNotes.toArray().filter(({ folder }) => folder === folderMatch[1]);
    return filterTrashed(notes);
  }

  if (tagMatch) {
    notes = allNotes.toArray().filter(({ tags }) => tags.some(tag => tag === tagMatch[1]));
    return filterTrashed(notes);
  }

  return filterTrashed(allNotes);
}

export default getNotes;
