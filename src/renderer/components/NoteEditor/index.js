import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';

import Icon from 'react-icons-kit';
import { ic_format_bold as bold } from 'react-icons-kit/md/ic_format_bold';
import { ic_format_italic as italic } from 'react-icons-kit/md/ic_format_italic';
import { ic_format_underlined as underlined } from 'react-icons-kit/md/ic_format_underlined';
import { ic_navigate_next as code } from 'react-icons-kit/md/ic_navigate_next';
import Toolbar from './helpers/Toolbar';
import Button from './helpers/Button';

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
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

class NoteEditor extends Component {
  state = {
    value: initialValue,
  };

  ref = (editor) => {
    this.editor = editor;
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  hasMark = (type) => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);

    return undefined;
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Button active={isActive} onMouseDown={event => this.onClickMark(event, type)}>
        <Icon icon={icon} />
      </Button>
    );
  };

  render() {
    const { value } = this.state;

    return (
      <>
        <Toolbar>
          {this.renderMarkButton('bold', bold)}
          {this.renderMarkButton('italic', italic)}
          {this.renderMarkButton('underlined', underlined)}
          {this.renderMarkButton('code', code)}
        </Toolbar>
        <div className="editor">
          <Editor
            value={value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            ref={this.ref}
            renderMark={this.renderMark}
          />
        </div>
      </>
    );
  }
}

export default NoteEditor;
