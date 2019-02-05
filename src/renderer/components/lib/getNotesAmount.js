import { folderPathnameRegex } from './consts';

function getNotesAmount(pathname, noteData) {
  if (!pathname || !noteData) return null;

  const { allNotes, starredNotes } = noteData;
  const notesArray = allNotes.toArray();
  const match = pathname.match(folderPathnameRegex);

  let count = 0;

  if (pathname === '/home') {
    const filtered = notesArray.filter(note => !note.isTrashed);
    count = filtered.length;
  }

  if (pathname === '/starred') {
    count = starredNotes.size;
  }

  if (match) {
    const folderId = match[1];
    const notesFromFolder = notesArray.filter(note => !note.isTrashed && note.folder === folderId);
    count = notesFromFolder.length;
  }

  return count >= 100 ? '99+' : +count;
}

export default getNotesAmount;
