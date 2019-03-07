import React from 'react';
import { string, func, bool } from 'prop-types';

import Icon from '@mdi/react';
import {
  mdiStarOutline as starOutline,
  mdiStar as star,
  mdiTrashCanOutline as trashIcon,
  mdiInformationOutline as infoIcon,
} from '@mdi/js';

const TitleBar = ({
  onStarClick,
  onTrashClick,
  onInputChange,
  handleRestore,
  handleDelete,
  title,
  isStarred,
  isTrashed,
}) => {
  const starIcon = isStarred ? star : starOutline;
  const starIconClassName = `title-bar__star-icon${isStarred ? ' title-bar__star-icon--starred' : ''}`;

  const infoGroup = isTrashed ? (
    <>
      <button type="button" className="title-bar__button title-bar__button--restore" onClick={handleRestore}>
        Restore note
      </button>
      <button type="button" className="title-bar__button title-bar__button--delete" onClick={handleDelete}>
        Delete note
      </button>
    </>
  ) : (
    <>
      <Icon className={starIconClassName} onClick={onStarClick} path={starIcon} />
      <Icon className="title-bar__icon" onClick={onTrashClick} path={trashIcon} />
      <Icon className="title-bar__icon" path={infoIcon} />
    </>
  );

  return (
    <div className="title-bar__row">
      <input
        type="text"
        className="title-bar__title"
        placeholder="Untitled"
        value={title}
        onChange={onInputChange}
        disabled={isTrashed}
      />

      <div className="title-bar__info-group">{infoGroup}</div>
    </div>
  );
};

export default TitleBar;

TitleBar.propTypes = {
  onStarClick: func.isRequired,
  onTrashClick: func.isRequired,
  onInputChange: func.isRequired,
  handleRestore: func.isRequired,
  handleDelete: func.isRequired,
  title: string.isRequired,
  isStarred: bool.isRequired,
  isTrashed: bool.isRequired,
};
