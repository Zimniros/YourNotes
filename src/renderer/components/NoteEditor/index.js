import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { withRouter } from 'react-router-dom';

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
import { initialEditorValue } from '../lib/consts';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const DEFAULT_NODE = 'paragraph';

class NoteEditor extends Component {
  state = {
    value: initialEditorValue,
  };

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    const key = new URLSearchParams(search).get('key');

    console.log('componentDidMount');
    console.log('location', location);
    console.log('key', key);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { search } = location;
    const key = new URLSearchParams(search).get('key');

    console.log('componentDidMount');
    console.log('location', location);
    console.log('key', key);
  }

  ref = (editor) => {
    this.editor = editor;
  };

  hasMark = (type) => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  hasBlock = (type) => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
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
    const isActive = this.hasMark(type);

    return (
      <Button active={isActive} onMouseDown={event => this.onClickMark(event, type)}>
        <Icon path={icon} />
      </Button>
    );
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const {
        value: { document, blocks },
      } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button active={isActive} onMouseDown={event => this.onClickBlock(event, type)}>
        <Icon path={icon} />
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
          {this.renderBlockButton('heading-one', header1)}
          {this.renderBlockButton('heading-two', header2)}
          {this.renderBlockButton('heading-three', header3)}
          {this.renderBlockButton('block-quote', quote)}
          {this.renderBlockButton('numbered-list', numberedList)}
          {this.renderBlockButton('bulleted-list', bulletedList)}
        </Toolbar>
        <div className="editor">
          <Editor
            value={value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            ref={this.ref}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
            placeholder="Start typing..."
          />
        </div>
      </>
    );
  }
}

export default withRouter(NoteEditor);
