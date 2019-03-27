/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { func, instanceOf } from 'prop-types';
import { sortBy, filter, includes, remove } from 'lodash';
import Autosuggest from 'react-autosuggest';
import Icon from '@mdi/react';
import { mdiPound as poundIcon } from '@mdi/js';

import { updateNote } from '../../actions';
import { addTag } from '../../actions/tags';
import { noteType, historyType } from '../../types';

import Map from '../../api/Map';

class TagSelect extends Component {
  static propTypes = {
    history: historyType.isRequired,
    note: noteType.isRequired,
    tags: instanceOf(Map).isRequired,
    dispatch: func.isRequired
  };

  state = {
    value: '',
    suggestions: []
  };

  inputSuggestionRef = React.createRef();

  componentDidMount() {
    this.buildSuggestions();
  }

  componentDidUpdate(prevProps) {
    const { note } = this.props;

    if (note.key !== prevProps.note.key) {
      this.reset();
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onInputBlur = () => {
    this.submitNewTag();
  };

  onInputKeyDown = event => {
    switch (event.keyCode) {
      case 9:
        event.preventDefault();
        this.submitNewTag();
        break;
      case 13:
        event.preventDefault();
        this.submitNewTag();
        break;

      default:
        break;
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const { note } = this.props;
    const { tags } = note;
    const inputValue = value.trim().toLowerCase();

    const suggestions = filter(
      this.suggestions,
      tag =>
        !includes(tags, tag.id) &&
        tag.name.toLowerCase().indexOf(inputValue) !== -1
    );

    this.setState({
      suggestions
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    const { name } = suggestion;

    this.addNewTag(name);
  };

  onTagClick = tagId => {
    const { history } = this.props;
    const pathname = `/tag/${tagId}`;

    history.push(pathname);
  };

  onTagRemove = (event, tagId) => {
    event.stopPropagation();

    const { note } = this.props;
    const { key: noteKey, tags } = note;

    remove(tags, tag => tag === tagId);

    const input = {
      tags
    };

    this.handleUpdateNote(noteKey, input);
  };

  addNewTag(newTag) {
    const { note, tags, dispatch } = this.props;
    const { key: noteKey, tags: noteTagIds } = note;

    if (newTag.length <= 0) {
      this.reset();

      return null;
    }

    const targetTag = tags.toArray().find(tag => tag.name === newTag);

    if (!targetTag) {
      dispatch(addTag(newTag))
        .then(tag => {
          noteTagIds.push(tag.id);
          const input = {
            tags: noteTagIds.slice()
          };

          this.handleUpdateNote(noteKey, input);
          this.reset();
        })
        .catch(error =>
          console.log('Error in addTag() in TagSelect component', error)
        );

      return null;
    }

    if (!includes(noteTagIds, targetTag.id)) {
      noteTagIds.push(targetTag.id);
      const input = {
        tags: noteTagIds.slice()
      };

      this.handleUpdateNote(noteKey, input);
      this.reset();
    }
  }

  reset() {
    this.buildSuggestions();

    this.setState({
      value: ''
    });
  }

  handleUpdateNote(noteKey, input) {
    const { dispatch } = this.props;

    dispatch(updateNote(noteKey, input)).catch(error =>
      console.log('Error in handleUpdateNote() in TagSelect component', error)
    );
  }

  submitNewTag() {
    this.addNewTag(this.inputSuggestionRef.current.input.value);
  }

  buildSuggestions() {
    const { tags } = this.props;
    this.suggestions = sortBy(tags.toArray(), 'name');
  }

  render() {
    const { value, suggestions } = this.state;
    const { note, tags } = this.props;
    const { tags: tagsIds } = note;

    const tagList = tagsIds.map(tagId => {
      const targetTag = tags.get(tagId);

      return (
        targetTag && (
          <div
            key={targetTag.id}
            className="tag-select__tag"
            onClick={() => this.onTagClick(targetTag.id)}
          >
            <Icon className="tag-select__tag-icon" path={poundIcon} />
            <span className="tag-select__tag-name">{targetTag.name}</span>
            <div
              className="tag-select__tag-cross-icon"
              onClick={event => this.onTagRemove(event, targetTag.id)}
            />
          </div>
        )
      );
    });

    const inputProps = {
      placeholder: 'Add tag...',
      value,
      onChange: this.onChange,
      onKeyDown: this.onInputKeyDown,
      onBlur: this.onInputBlur
    };

    return (
      <div className="details__tag-select tag-select">
        {tagList}
        <Autosuggest
          ref={this.inputSuggestionRef}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={suggestion => suggestion.name}
          renderSuggestion={suggestion => <div>{suggestion.name}</div>}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ tags: state.tags });

export default withRouter(connect(mapStateToProps)(TagSelect));
