/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal } from '../../actions';

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

    this.inputRef = React.createRef();
  }

  onOpen() {
    this.inputRef.current.focus();
  }

  onSubmit(event) {
    // TODO: finish submiting
    event.preventDefault();
    this.onClose(event);
  }

  onClose(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(closeModal());
  }

  render() {
    const { isOpen } = this.props;
    if (isOpen) {
      return (
        <Modal
          isOpen={isOpen}
          onAfterOpen={() => this.onOpen()}
          onRequestClose={event => this.onClose(event)}
          className="add-folder-modal"
          overlayClassName="add-folder-modal__overlay"
          ariaHideApp={false}
        >
          <div className="add-folder-modal__top-row">
            <h2 className="add-folder-modal__header">Add new folder</h2>
            <div className="add-folder-modal__close" onClick={event => this.onClose(event)} />
          </div>
          <form className="add-folder-modal__form" onSubmit={event => this.onSubmit(event)}>
            <label className="add-folder-modal__label" htmlFor="name-input">
              Folder name
            </label>
            <input className="add-folder-modal__input" type="text" id="name-input" ref={this.inputRef} required />
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
