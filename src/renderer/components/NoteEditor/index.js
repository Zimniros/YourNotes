import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import BoldMark from './helpers/BoldMark';
import ItalicMark from './helpers/ItalicMark';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'My first paragraph!',
              },
            ],
          },
        ],
      },
    ],
  },
});

class NoteEditor extends Component {
  state = {
    value: initialValue,
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (e, change) => {
    if (!e.ctrlKey) {
      return;
    }
    e.preventDefault();

    switch (e.key) {
      case 'b': {
        change.toggleMark('bold');
        break;
      }
      case 'i': {
        change.toggleMark('italic');
        break;
      }
      default:
        break;
    }
  };

  renderMark = (props) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />;
      case 'italic':
        return <ItalicMark {...props} />;
      default:
        return false;
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div className="editor">
        <Editor
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
      </div>
    );
  }
}

export default NoteEditor;
