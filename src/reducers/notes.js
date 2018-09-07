import faker from 'faker';
import { EditorState, ContentState } from 'draft-js';
import { getActiveNoteId } from '../selectors';
import { setActiveNoteId } from './activeNoteId';

const textArray = [
  `Đánh răng súc miệng, tập thể dục buổi sáng\nĐăng video lên youtube`,
  `Bitcoin đang giảm giá\nMua thêm ETH`,
  `React và AngularJS, cái nào hơn\nReact vô địch không cần phải nghĩ`,
];

const notes = Array.from({ length: 3 }, (v, k) => {
  const text = textArray[k];
  const contentState = ContentState.createFromText(text);
  return {
    id: faker.random.uuid(),
    content: EditorState.createWithContent(contentState),
    updatedAt: faker.date.recent(),
    createdAt: faker.date.recent(),
  }
});

const SET_NOTES_DATA = 'SET_NOTES_DATA';
const REMOVE_NOTE = 'REMOVE_NOTE';
const ADD_NOTE = 'ADD_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';

export const setNotesData = notes => ({
  type: SET_NOTES_DATA,
  payload: { notes }
});

export const removeNote = noteId => ({
  type: REMOVE_NOTE,
  payload: { noteId }
});


export const removeCurrentNote = () => (dispatch, getState) => {
  const state = getState();
  const noteId = getActiveNoteId(state);
  if (!noteId) return;
  const noteIndex = state.notes.findIndex(note => note.id === noteId);
  let nextNoteId = null;
  if (noteIndex >= 0 && state.notes.length >= 2) {
    if (noteIndex === state.notes.length - 1) {
      nextNoteId = state.notes[state.notes.length - 1].id;
    } else if (state.notes[noteIndex - 1]){
      nextNoteId = state.notes[noteIndex - 1].id;
    } else {
      nextNoteId = state.notes[1].id;
    }
  }
  if (nextNoteId) dispatch(setActiveNoteId(nextNoteId));
  dispatch(removeNote(noteId));
  
}

export const updateNote = (noteId, content) => ({
  type: UPDATE_NOTE,
  payload: { noteId, content },
});

export const addNoteToList = (note) => ({
  type: ADD_NOTE,
  payload: { note },
});

export const addNote = () => dispatch => {
  const id = faker.random.uuid();
  const note = { 
    id, 
    content: EditorState.createEmpty(), 
    createdAt: new Date(), 
    updatedAt: new Date(), 
  };
  dispatch(addNoteToList(note));
  dispatch(setActiveNoteId(id));
}

export default function notesReducer(state = notes, action) {
  switch (action.type) {
    case SET_NOTES_DATA:
      return action.payload.notes;
    
    case REMOVE_NOTE:
      return state.filter(note => note.id !== action.payload.noteId);
    
    case UPDATE_NOTE:
      const { noteId, content } = action.payload;
      return state.map(note => {
        if (note.id === noteId) {
          const changeType = content.getLastChangeType();
          const updatedNote = { ...note, content };
          if (changeType) updatedNote.updatedAt = new Date();
          return updatedNote;
        }
        return note;
      });
    
    case ADD_NOTE:      
      const note = action.payload.note; 
      return [...state, note];
    
    default:
      return state;
  }
}