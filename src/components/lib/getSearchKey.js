function getSearchKey(location) {
  if (!location) return null;

  const { search } = location;

  if (!search) return null;

  const key = new URLSearchParams(search).get('key');

  return key || null;
}

export default getSearchKey;
