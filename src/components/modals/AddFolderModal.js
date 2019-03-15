/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { closeModal, addFolder } from "../../actions";
import addFolderAPI from "../../api/addFolder";

class AddFolderModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      folderName: "",
      error: ""
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

    this.setState({ folderName: folderName.trim() }, () => {
      addFolderAPI(folderName)
        .then(folder => {
          dispatch(addFolder(folder));
          this.onClose(event);
        })
        .catch(error => this.setState({ error: error.message }));
    });
  }

  onClose() {
    const { dispatch } = this.props;
    this.setState({ folderName: "", error: "" });
    dispatch(closeModal());
  }

  render() {
    const { folderName, error } = this.state;

    const errorMessage = error ? (
      <span className="modal__error">{error}</span>
    ) : null;
    const inputClassName = error
      ? "modal__input modal__input--error"
      : "modal__input";

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
          <h2 className="modal__header">Add new folder</h2>
          <div className="modal__close" onClick={() => this.onClose()} />
        </div>
        <form className="modal__form" onSubmit={event => this.onSubmit(event)}>
          <div className="modal__group">
            <input
              className={inputClassName}
              onChange={event => this.onInputChange(event)}
              value={folderName}
              type="text"
              id="name-input"
              ref={this.inputRef}
              placeholder="New Folder"
              required
            />

            <label className="modal__label" htmlFor="name-input">
              Folder name
            </label>
            {errorMessage}
          </div>

          <div className="modal__bottom-row">
            <button className="btn btn--primary " type="submit">
              Confirm
            </button>
            <button
              className="btn btn--cancel"
              type="button"
              onClick={event => this.onClose(event)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default connect(null)(AddFolderModal);