import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';

import { locationType } from '../../types';
import Map from '../../../lib/Map';
import getSearchKey from '../lib/getSearchKey';

import NoteEditor from './NoteEditor';

class Details extends Component {
  static propTypes = {
    allNotes: instanceOf(Map).isRequired,
    location: locationType.isRequired,
  };

  getNote() {
    const { location, allNotes } = this.props;
    const key = getSearchKey(location);

    if (!key) return null;

    const note = allNotes.get(key);

    return note || null;
  }

  render() {
    const note = this.getNote();

    if (note) {
      return <NoteEditor note={note} />;
    }

    return <div>Create new note</div>;
  }
}

export default withRouter(Details);
