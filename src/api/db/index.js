import notes from './getNotesDatastore';
import folders from './getFoldersDatastore';
import tags from './getTagsDatastore';

function resolveDatastores() {
  return Promise.all([notes.load(), folders.load(), tags.load()])
    .then(() => {
      const Datastore = {
        notes,
        folders,
        tags
      };

      return Datastore;
    })
    .catch(error => new Error(error));
}

export default resolveDatastores;
