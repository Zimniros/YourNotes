/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { func, instanceOf } from 'prop-types';
import { connect } from 'react-redux';

import Icon from '@mdi/react';
import { mdiChevronRight as chevron, mdiPlus as plus } from '@mdi/js';

import context from '../../../lib/context';
import Map from '../../../lib/Map';

import { showAddTagModal, showRenameTagModal, showDeleteTagConfirmationModal } from '../../actions';

import TagItem from './TagItem';

class TagList extends Component {
  static propTypes = {
    dispatch: func.isRequired,
    tags: instanceOf(Map).isRequired,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.handleTagContextMenu = this.handleTagContextMenu.bind(this);
    this.handleRenameTag = this.handleRenameTag.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
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

    dispatch(showAddTagModal());
  }

  handleTagContextMenu(tag) {
    const deleteTagLabel = 'Delete tag';
    const renameTagLabel = 'Rename tag';

    const templates = [];

    templates.push(
      {
        label: renameTagLabel,
        click: () => this.handleRenameTag(tag),
      },
      {
        label: deleteTagLabel,
        click: () => this.handleDeleteTag(tag),
      },
    );

    context.popup(templates);
  }

  handleDeleteTag(tag) {
    const { dispatch } = this.props;

    dispatch(showDeleteTagConfirmationModal(tag));
  }

  handleRenameTag(tag) {
    const { dispatch } = this.props;

    dispatch(showRenameTagModal(tag));
  }

  render() {
    const { isOpen } = this.state;
    const { tags } = this.props;

    const tagList = tags && tags.size
      ? tags.map(tag => <TagItem key={tag.id} tag={tag} handleFolderContextMenu={this.handleTagContextMenu} />)
      : null;

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

        {isOpen ? tagList : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({ tags: state.tags });

export default connect(mapStateToProps)(TagList);
