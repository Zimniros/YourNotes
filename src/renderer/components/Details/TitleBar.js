import React from 'react';
import { string, func, bool } from 'prop-types';

import Icon from '@mdi/react';
import {
  mdiStarOutline as starOutline,
  mdiStar as star,
  mdiTrashCanOutline as trash,
  mdiInformationOutline as info,
} from '@mdi/js';

const TitleBar = ({ onInputChange, title, isStarred }) => {
  const starIcon = isStarred ? star : starOutline;
  const starIconClassName = `details__icon details__icon__star-icon${
    isStarred ? ' details__icon__star-icon--starred' : ''
  }`;

  return (
    <div className="detailt__top-bar">
      <input type="text" className="details__title" placeholder="Untitled" value={title} onChange={onInputChange} />

      <div className="details__icons-group">
        <Icon className={starIconClassName} path={starIcon} />
        <Icon className="details__icon" path={trash} />
        <Icon className="details__icon" path={info} />
      </div>
    </div>
  );
};

export default TitleBar;

TitleBar.propTypes = {
  onInputChange: func.isRequired,
  title: string.isRequired,
  isStarred: bool.isRequired,
};
