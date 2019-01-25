/* eslint-disable import/prefer-default-export */
import { mdiNotebook as notebook, mdiStarOutline as star, mdiTrashCanOutline as trash } from '@mdi/js';

export const sidebarShortcuts = [
  {
    name: 'All Notes',
    route: 'home',
    icon: notebook,
  },
  {
    name: 'Starred',
    route: 'home',
    icon: star,
  },
  {
    name: 'Trash',
    route: 'trash',
    icon: trash,
  },
];
