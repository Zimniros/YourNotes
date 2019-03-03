import React from 'react';
import { string, func, bool } from 'prop-types';

import Icon from '@mdi/react';
import {
  mdiStarOutline as starOutline,
  mdiStar as star,
  mdiTrashCanOutline as trash,
  mdiInformationOutline as info,
} from '@mdi/js';

const TitleBar = ({
  onStarClick, onTrashClick, onInputChange, handleRestore, title, isStarred, isTrashed,
}) => {
  const starIcon = isStarred ? star : starOutline;
  const starIconClassName = `details__icon details__icon__star-icon${
    isStarred ? ' details__icon__star-icon--starred' : ''
  }`;

  const infoGroup = isTrashed ? (
    <>
      <button type="button" className="details__button details__button--restore" onClick={handleRestore}>
        {'Restore note'}
      </button>
      <button
        type="button"
        className="details__button details__button--delete"
        onClick={() => console.log('Delete note')}
      >
        {'Delete note'}
      </button>
    </>
  ) : (
    <>
      <Icon className={starIconClassName} onClick={onStarClick} path={starIcon} />
      <Icon className="details__icon" onClick={onTrashClick} path={trash} />
      <Icon className="details__icon" path={info} />
    </>
  );

  return (
    <div className="detailt__top-bar">
      <input
        type="text"
        className="details__title"
        placeholder="Untitled"
        value={title}
        onChange={onInputChange}
        disabled={isTrashed}
      />

      <div className="details__info-group">{infoGroup}</div>
    </div>
  );
};

export default TitleBar;

TitleBar.propTypes = {
  onStarClick: func.isRequired,
  onTrashClick: func.isRequired,
  onInputChange: func.isRequired,
  handleRestore: func.isRequired,
  title: string.isRequired,
  isStarred: bool.isRequired,
  isTrashed: bool.isRequired,
};
