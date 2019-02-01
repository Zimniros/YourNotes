/* eslint-disable react/no-did-update-set-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-vars */
import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { connect } from 'react-redux';

import Icon from '@mdi/react';
import {
  mdiFormatBold as bold,
  mdiFormatItalic as italic,
  mdiFormatUnderline as underlined,
  mdiFormatHeader1 as header1,
  mdiFormatHeader2 as header2,
  mdiFormatHeader3 as header3,
  mdiFormatListNumbered as numberedList,
  mdiFormatListBulleted as bulletedList,
  mdiFormatQuoteOpen as quote,
  mdiCodeTags as code,
} from '@mdi/js';

import Toolbar from './Toolbar';
import Button from './Button';
import { updateNote } from '../../actions';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const DEFAULT_NODE = 'paragraph';

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.className = 'details__editor';

    this.state = {
      note: null,
      isEditorFocused: false,
    };

    this.delayTimer = null;
  }

  componentDidMount() {
    const { note } = this.props;
    this.setState({ note });
  }

  componentWillReceiveProps(nextProps) {
    const isNewNote = nextProps.note.key !== this.props.note.key;

    if (isNewNote) {
      this.setState({ note: nextProps.note });
    }
  }

  hasMark = (type) => {
    const { note } = this.state;
    const { value } = note;

    return value.activeMarks.some(mark => mark.type === type);
  };

  hasBlock = (type) => {
    const { note } = this.state;
    const { value } = note;
    return value.blocks.some(node => node.type === type);
  };

  onChange = ({ value }) => {
    const { note } = this.state;
    const updatedAt = new Date().getTime();

    this.setState({ note: Object.assign({}, note, { value, updatedAt }) }, () => {
      this.saveNote();
    });
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editorRef.current.toggleMark(type);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    const editor = this.editorRef.current;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => !!document.getClosest(block.key, parent => parent.type === type));

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor.unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list').wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
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

  saveNote() {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.saveNoteNow();
    }, 1000);
  }

  saveNoteNow() {
    const { dispatch } = this.props;
    const { note } = this.state;
    clearTimeout(this.delayTimer);
    this.delayTimer = null;

    dispatch(updateNote(note));
  }

  isEditorFocused() {
    const { isEditorFocused } = this.state;
    const isEditorActiveElement = document.activeElement.className === this.className;

    if (isEditorActiveElement && !isEditorFocused) {
      this.setState({ isEditorFocused: true });
    }

    if (!isEditorActiveElement && isEditorFocused) {
      this.setState({ isEditorFocused: false });
    }
  }

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

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  };

  renderMarkButton = (type, icon) => {
    const { isEditorFocused } = this.state;
    const isDisabled = !isEditorFocused;
    const isActive = this.hasMark(type);

    return (
      <Button isActive={isActive} onMouseDown={event => this.onClickMark(event, type)} isDisabled={isDisabled}>
        <Icon path={icon} />
      </Button>
    );
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);
    const { isEditorFocused } = this.state;
    const isDisabled = !isEditorFocused;

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { note } = this.state;
      const {
        value: { document, blocks },
      } = note;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button isActive={isActive} onMouseDown={event => this.onClickBlock(event, type)} isDisabled={isDisabled}>
        <Icon path={icon} />
      </Button>
    );
  };

  render() {
    const { note } = this.state;

    if (!note) return <div />;

    const { value, key } = note;

    return (
      <div className="details">
        <Toolbar>
          {this.renderMarkButton('bold', bold)}
          {this.renderMarkButton('italic', italic)}
          {this.renderMarkButton('underlined', underlined)}
          {this.renderMarkButton('code', code)}
          {this.renderBlockButton('heading-one', header1)}
          {this.renderBlockButton('heading-two', header2)}
          {this.renderBlockButton('heading-three', header3)}
          {this.renderBlockButton('block-quote', quote)}
          {this.renderBlockButton('numbered-list', numberedList)}
          {this.renderBlockButton('bulleted-list', bulletedList)}
        </Toolbar>
        <input type="text" className="details__title" placeholder="Untitled" value={key} />

        <Editor
          className={this.className}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          ref={this.editorRef}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          placeholder="Start typing..."
        />
      </div>
    );
  }
}

export default connect(null)(NoteEditor);
