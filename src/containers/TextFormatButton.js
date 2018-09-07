import { connect } from 'react-redux';
import { RichUtils } from 'draft-js';
import { updateNote } from '../reducers/notes';
import { getActiveNoteId, getActiveNote } from '../selectors';
import TextFormatButton from '../components/Header/TextFormatButton';

const toggleBlockType = blockType => (dispatch, getState) => {
  const noteId = getActiveNoteId(getState());
  if (!noteId) return;
  const note = getState().notes.find(note => note.id === noteId);
  const nextState = RichUtils.toggleBlockType(note.content, blockType);  
  dispatch(updateNote(noteId, nextState));
}

const getContentBlockFromSelection = editorState => {
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();
  const content = editorState.getCurrentContent();  
  let currentBlock = content.getBlockForKey(startKey);
  const blocks = [currentBlock];
  if (startKey === endKey) return blocks;  
  let currentBlockKey = startKey;

  while (currentBlockKey && currentBlockKey !== endKey) {
    currentBlockKey = content.getKeyAfter(currentBlockKey);
    if (currentBlockKey) {
      const block = content.getBlockForKey(currentBlockKey);
      blocks.push(block);
    }    
  }

  return blocks;
}

const getSelectedBlockTypes = (state) => {
  const note = getActiveNote(state);
  if (!note) return;
  const blocks = getContentBlockFromSelection(note.content);
  const types = blocks.map(block => block.type);
  console.log(types);
  return types;
}

const mapStateToProps = state => ({
  selectedBlockTypes: getSelectedBlockTypes(state),
});

const mapDispatchToProps = {
  toggleBlockType,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextFormatButton);