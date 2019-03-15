import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { instanceOf } from "prop-types";

import { tagPathnameRegex, folderPathnameRegex } from "./lib/consts";
import { notesDataType, locationType, historyType, sortByType } from "../types";
import Map from "../api/Map";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import NoteList from "./NoteList";
import Details from "./Details";
import ModalRoot from "./modals";

class App extends Component {
  static propTypes = {
    location: locationType.isRequired,
    history: historyType.isRequired,
    notesData: notesDataType.isRequired,
    tags: instanceOf(Map).isRequired,
    folders: instanceOf(Map).isRequired,
    sortBy: sortByType.isRequired
  };

  componentDidMount() {
    const { location, history } = this.props;
    const { pathname } = location;
    const { push } = history;

    if (pathname === "/") push("/home");
  }

  componentDidUpdate() {
    const { location, history, tags, folders } = this.props;
    const { pathname } = location;

    const folderMatch = pathname.match(folderPathnameRegex);
    const tagMatch = pathname.match(tagPathnameRegex);

    if (folderMatch) {
      const targetFolder = folders.get(folderMatch[1]);

      return !targetFolder && history.replace("/home");
    }

    if (tagMatch) {
      const targetTag = tags.get(tagMatch[1]);

      return !targetTag && history.replace("/home");
    }

    return null;
  }

  render() {
    const { notesData, location, tags, folders, sortBy } = this.props;
    const { allNotes } = notesData;

    return (
      <div className="app">
        <Sidebar
          notesData={notesData}
          location={location}
          tags={tags}
          folders={folders}
        />
        <div className="notes-viewer">
          <TopBar tags={tags} folders={folders} />
          <NoteList notesData={notesData} sortBy={sortBy} />
        </div>
        <Details allNotes={allNotes} />
        <ModalRoot />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notesData: state.notesData,
  tags: state.tags,
  folders: state.folders,
  sortBy: state.sortBy
});

export default withRouter(connect(mapStateToProps)(App));
