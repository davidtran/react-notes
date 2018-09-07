import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import faker from 'faker';
import NoteItem from './NoteItem';

const List = styled.div`
  display: flex;
  flex-direction: column;    
  border-right: 1px solid rgba(0, 0, 0, 0.1);  
  outline: none;
  min-height: 100%;
`;

const sortNotes = notes => notes.sort((n1, n2) => n2.updatedAt - n1.updatedAt);

const NoteList = ({ notes, activeNoteId, setActiveNoteId, removeCurrentNote, searchKeyword, addNote }) => (
  
    <List
      tabIndex={0}
      onKeyDown={e => {        
        if (e.keyCode === 8) {
          return removeCurrentNote();
        }        
      }}
    >
      {sortNotes(notes) && notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          isActive={note.id === activeNoteId}
          onClick={setActiveNoteId}     
          searchKeyword={searchKeyword}     
        />
      ))}
    </List>
  

);

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  activeNoteId: PropTypes.string.isRequired,
  setActiveNoteId: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  removeCurrentNote: PropTypes.func.isRequired,
  searchKeyword: PropTypes.string,
};

export default NoteList;
