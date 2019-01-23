/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

class SearchBar extends Component {
  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="search-bar" onSubmit={event => this.onSubmit(event)}>
        <input className="search-bar__input" type="text" placeholder="Search" />
      </form>
    );
  }
}

export default SearchBar;
