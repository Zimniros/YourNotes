/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal, addTag } from '../../actions';
import addTagAPI from '../../../lib/addTag';

class AddTagModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      tagName: '',
      error: '',
    };

    this.inputRef = React.createRef();
  }

  onOpen() {
    this.inputRef.current.focus();
  }

  onInputChange(event) {
    this.setState({ tagName: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const { tagName } = this.state;
    const { dispatch } = this.props;

    this.setState({ tagName: tagName.trim() }, () => {
      addTagAPI(tagName)
        .then((tag) => {
          dispatch(addTag(tag));
          console.log('console log', tag);
          this.onClose(event);
        })
        .catch(error => this.setState({ error: error.message }));
    });
  }

  onClose() {
    const { dispatch } = this.props;
    this.setState({ tagName: '', error: '' });
    dispatch(closeModal());
  }

  render() {
    const { tagName, error } = this.state;

    const errorMessage = error ? <span className="modal__error">{error}</span> : null;
    const inputClassName = error ? 'modal__input modal__input--error' : 'modal__input';

    return (
      <Modal
        isOpen
        onAfterOpen={() => this.onOpen()}
        onRequestClose={() => this.onClose()}
        className="modal"
        overlayClassName="modal__overlay"
        ariaHideApp={false}
      >
        <div className="modal__top-row">
          <h2 className="modal__header">Add new tag</h2>
          <div className="modal__close" onClick={() => this.onClose()} />
        </div>
        <form className="modal__form" onSubmit={event => this.onSubmit(event)}>
          <div className="modal__group">
            <input
              className={inputClassName}
              onChange={event => this.onInputChange(event)}
              value={tagName}
              type="text"
              id="name-input"
              ref={this.inputRef}
              placeholder="New Tag"
              required
            />

            <label className="modal__label" htmlFor="name-input">
              Tag name
            </label>
            {errorMessage}
          </div>

          <div className="modal__bottom-row">
            <button className="btn btn--primary " type="submit">
              Confirm
            </button>
            <button className="btn btn--cancel" type="button" onClick={event => this.onClose(event)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default connect(null)(AddTagModal);
