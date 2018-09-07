import { connect } from 'react-redux';
import NoteEditor from '../components/NoteEditor';
import { updateNote } from '../reducers/notes';
import { getActiveNoteId, getActiveNote } from '../selectors';

const mapStateToProps = state => {
  const activeNoteId = getActiveNoteId(state);
  const note = getActiveNote(state);
  
  return {
    note,
    activeNoteId,
  };
}

const mapDispatchToProps = {
  onChange: updateNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor);