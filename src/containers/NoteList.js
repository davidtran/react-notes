import { connect } from 'react-redux';
import { setActiveNoteId } from '../reducers/activeNoteId';
import { removeCurrentNote, addNote } from '../reducers/notes';
import { getActiveNoteId, getSortedNotes } from '../selectors';
import NoteList from '../components/NoteList/NoteList';

const mapStateToProps = state => ({
  notes: state.search.cacheResult ? state.search.cacheResult : getSortedNotes(state),
  activeNoteId: getActiveNoteId(state),
  searchKeyword: state.search.keyword,
});

const mapDispatchToProps = {
  removeCurrentNote,
  addNote,
  setActiveNoteId,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);


