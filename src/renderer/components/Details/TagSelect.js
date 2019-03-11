import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { func, instanceOf } from 'prop-types';
import { sortBy, filter } from 'lodash';
import Autosuggest from 'react-autosuggest';

import { updateNote } from '../../actions';
import updateNoteApi from '../../../lib/updateNote';
import { noteType, historyType } from '../../types';
import Map from '../../../lib/Map';

class TagSelect extends Component {
  static propTypes = {
    tags: instanceOf(Map).isRequired,
  };

  state = {
    value: '',
    suggestions: [],
  };

  componentDidMount() {
    this.buildSuggestions();
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();

    const suggestions = filter(this.suggestions, tag => tag.name.toLowerCase().indexOf(inputValue) !== -1);

    this.setState({
      suggestions,
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  buildSuggestions() {
    const { tags } = this.props;
    this.suggestions = sortBy(tags.toArray(), 'name');
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Add tag...',
      value,
      onChange: this.onChange,
      // onKeyDown: this.onInputKeyDown,
      //       onBlur: this.onInputBlur,
    };

    return (
      <div className="storage-info__tag-select tag-select">
        <div className="tagSelect__input">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={suggestion => suggestion.name}
            renderSuggestion={suggestion => <div>{suggestion.name}</div>}
            inputProps={inputProps}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ tags: state.tags });

export default withRouter(connect(mapStateToProps)(TagSelect));
