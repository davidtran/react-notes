import React, { Component } from 'react';
import { Editor, RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

const Container = styled.div`
  padding: 10px;
`;

const Time = styled.div`
  color: lightgray;
  text-align: center;
  margin-bottom: 5px;
  font-size: 12px;
`;

const EditorWrapper = styled.div`
  padding: 0 15px;
`;

export default class NoteEditor extends Component { 

  state = {
    editorState: this.props.note.content,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.note.id !== this.props.note.id) {
      this.editorEl.focus();
    }
  }

  onChange = (editorState) => {
    const { note, onChange } = this.props;    
    onChange(note.id, editorState);    
  }

  keyBindingFn = (event) => {
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 66) {
      return 'text-bold';
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 73) {
      return 'text-italic';
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 85) {
      return 'text-underline';
    }        
    return getDefaultKeyBinding(event);
  }

  handleKeyCommand = (command, editorState) => {
    let nextState;
    if (command === 'text-bold') nextState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
    if (command === 'text-italic') nextState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
    if (command === 'text-underline') nextState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
    if (nextState) {
      this.onChange(nextState);
      return 'handled';
    }
    return 'not-handled';
  }
  
  displayTime = () => {
    const { note } = this.props;
    const time = moment(note.createdAt).format('MMMM DD, YYYY \\at HH:mm');
    return time;
  }

  render() {
    const { note } = this.props;
    if (!note) return null;

    return (
      <Container>
        <Time>
          { this.displayTime() }
        </Time>
        <EditorWrapper>
          
          <Editor 
            editorState={note.content} 
            onChange={this.onChange} 
            keyBindingFn={this.keyBindingFn}
            handleKeyCommand={this.handleKeyCommand}
            ref={el => this.editorEl = el}
          />
        </EditorWrapper>
      </Container>
    );
  }

}

NoteEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
};