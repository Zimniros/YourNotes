import React from 'react';
import { connect } from 'react-redux';
import { string, instanceOf } from 'prop-types';
import Icon from '@mdi/react';
import { mdiFolder as folderIcon } from '@mdi/js';

import Map from '../../../lib/Map';

const StorageInfoBar = ({ folderId, folders }) => {
  const folder = folders.get(folderId);
  const folderName = folder ? folder.name : 'All Notes';

  console.log('folderId', folderId);
  console.log('folders', folders);
  console.log('folder', folder);

  return (
    <div className="title-bar__storage-info storage-info">
      <div className="storage-info__folder">
        <Icon className="storage-info__icon" path={folderIcon} />
        <span className="storage-info__name">{folderName}</span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ folders: state.folders });

export default connect(mapStateToProps)(StorageInfoBar);

StorageInfoBar.propTypes = {
  folderId: string.isRequired,
  folders: instanceOf(Map).isRequired,
};
