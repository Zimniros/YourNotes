function getNotesAmount(notes) {
  if (!notes) return null;

  const count = notes.length;

  return count >= 100 ? '99+' : `${count}`;
}

export default getNotesAmount;
