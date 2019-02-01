/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { mdiNotebook as notebook, mdiStarOutline as star, mdiTrashCanOutline as trash } from '@mdi/js';

export const sidebarShortcuts = [
  {
    name: 'All Notes',
    route: '/home',
    icon: notebook,
  },
  {
    name: 'Starred',
    route: '/starred',
    icon: star,
  },
  {
    name: 'Trash',
    route: '/trash',
    icon: trash,
  },
];

export const initialEditorValue = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [],
      },
    ],
  },
};

export const folderPathnameRegex = /^\/folder\/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}[\/\?]?/m;

export default {
  sidebarShortcuts,
  folderPathnameRegex,
  initialEditorValue,
};
