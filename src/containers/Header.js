import { connect } from 'react-redux';
import { addNote, removeCurrentNote } from '../reducers/notes';
import Header from '../components/Header';
import { getActiveNoteId } from '../selectors';

const mapStateToProps = state => ({
  activeNoteId: getActiveNoteId(state),
});

const mapDispatchToProps = {
  addNote,
  removeCurrentNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
