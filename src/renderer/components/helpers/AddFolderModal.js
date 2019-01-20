/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal, addFolder } from '../../actions';
import addFolderAPI from '../../../lib/addFolder';

class AddFolderModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isOpen: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      folderName: '',
      error: '',
    };

    this.inputRef = React.createRef();
  }

  onOpen() {
    this.inputRef.current.focus();
  }

  onInputChange(event) {
    this.setState({ folderName: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const { folderName } = this.state;
    const { dispatch } = this.props;

    addFolderAPI(folderName)
      .then((folder) => {
        dispatch(addFolder(folder));
        this.onClose(event);
      })
      .catch(error => this.setState({ error: error.message }));
  }

  onClose() {
    const { dispatch } = this.props;
    this.setState({ folderName: '', error: '' });
    dispatch(closeModal());
  }

  render() {
    const { folderName, error } = this.state;
    const { isOpen } = this.props;

    const errorMessage = error ? <span className="add-folder-modal__error">{error}</span> : null;
    const inputClassName = error ? 'add-folder-modal__input add-folder-modal__input--error' : 'add-folder-modal__input';

    if (isOpen) {
      return (
        <Modal
          isOpen={isOpen}
          onAfterOpen={() => this.onOpen()}
          onRequestClose={() => this.onClose()}
          className="add-folder-modal"
          overlayClassName="add-folder-modal__overlay"
          ariaHideApp={false}
        >
          <div className="add-folder-modal__top-row">
            <h2 className="add-folder-modal__header">Add new folder</h2>
            <div className="add-folder-modal__close" onClick={() => this.onClose()} />
          </div>
          <form className="add-folder-modal__form" onSubmit={event => this.onSubmit(event)}>
            <div className="add-folder-modal__group">
              <label className="add-folder-modal__label" htmlFor="name-input">
                Folder name
              </label>
              <input
                className={inputClassName}
                onChange={event => this.onInputChange(event)}
                value={folderName}
                type="text"
                id="name-input"
                ref={this.inputRef}
                required
              />
              {errorMessage}
            </div>

            <div className="add-folder-modal__bottom-row">
              <button className="btn btn--primary " type="submit">
                Confirm
              </button>
              <button className="btn" type="button" onClick={event => this.onClose(event)}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({ isOpen: state.modal.isOpen });

export default connect(mapStateToProps)(AddFolderModal);
