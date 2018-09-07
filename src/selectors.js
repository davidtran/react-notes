import { createSelector } from 'reselect';

const getDefaultActiveNoteId = state => state.activeNoteId;

const getNotes = state => state.notes;

export const getSortedNotes = createSelector(
  getNotes,
  (notes) => {
    notes.sort((n1, n2) => n2.updatedAt - n1.updatedAt);
    return notes;
  }
);

export const getActiveNoteId = createSelector(
  getDefaultActiveNoteId,
  getSortedNotes,
  (activeNoteId, notes) => {
    if (activeNoteId) return activeNoteId;
    if (notes && notes.length > 0) return notes[0].id;
    return null;
  },
);

export const getActiveNote = createSelector(
  getActiveNoteId,
  getNotes,
  (noteId, notes) => {
    if (!noteId) return null;
    return notes.find(note => note.id === noteId);
  },
);