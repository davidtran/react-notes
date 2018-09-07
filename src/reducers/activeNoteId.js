const SET_ACTIVE_NOTE_ID = 'SET_ACTIVE_NOTE_ID';

export const setActiveNoteId = noteId => ({
  type: SET_ACTIVE_NOTE_ID,
  payload: noteId,
});

export default function activeNoteIdReducer(state = null, action) {
  switch (action.type) {
    case SET_ACTIVE_NOTE_ID:      
      return action.payload;
    
    default:
      return state;
  }
}