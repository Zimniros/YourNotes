import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
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

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');

class NoteEditor extends Component {
  state = {
    value: initialValue,
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);

    return undefined;
  };

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />;
      case 'italic':
        return <ItalicMark {...props} />;
      default:
        return next();
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
