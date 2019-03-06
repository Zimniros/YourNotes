/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import Icon from '@mdi/react';
import { mdiChevronRight as chevron, mdiPlus as plus } from '@mdi/js';

import context from '../../../lib/context';

class TagList extends Component {
  static propTypes = {
    dispatch: func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  onTitleClick(event) {
    event.preventDefault();
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  }

  onNewClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const { dispatch } = this.props;
  }

  handleFolderContextMenu(tag) {
    const deleteTagLabel = 'Delete tag';
    const renameTagLabel = 'Rename tag';

    const templates = [];

    templates.push(
      {
        label: deleteTagLabel,
        click: () => this.handleRenameTag(tag),
      },
      {
        label: renameTagLabel,
        click: () => this.handleDeleteTag(tag),
      },
    );

    context.popup(templates);
  }

  handleDeleteTag(tag) {
    const { dispatch } = this.props;
  }

  handleRenameTag(tag) {
    const { dispatch } = this.props;
  }

  render() {
    const { isOpen } = this.state;

    const className = `sidebar__shortcuts ${isOpen ? 'sidebar__shortcuts--is-open' : ''}`;

    return (
      <div className={className}>
        <div className="shortcuts__title" onClick={event => this.onTitleClick(event)}>
          <Icon className="shortcuts__icon shortcuts__icon--chevron" path={chevron} />
          <span className="shortcuts__text">Tags</span>
          <Icon
            onClick={event => this.onNewClick(event)}
            className="shortcuts__icon shortcuts__icon--new"
            path={plus}
          />
        </div>
      </div>
    );
  }
}
export default connect(null)(TagList);
