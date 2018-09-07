import { connect } from 'react-redux';
import NoteEditor from '../components/NoteEditor';
import { updateNote } from '../reducers/notes';
import { getActiveNoteId } from '../selectors';

const mapStateToProps = state => {
  const activeNoteId = getActiveNoteId(state);
  const note = state.notes && state.notes.find(note => note.id === activeNoteId);
  
  return {
    note,
  };
}

const mapDispatchToProps = {
  onChange: updateNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor);