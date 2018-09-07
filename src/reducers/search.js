const SET_SEARCH_KEYWORD = 'SET_SEARCH_KEYWORD';
const SET_SEARCH_CACHE_RESULT = 'SET_SEARCH_CACHE_RESULT';

function filterNotes(notes, keyword) {
  if (!keyword || keyword.length === 0) return notes;
  return notes.filter(note => {
    const text = note.content.getCurrentContent().getPlainText();
    return text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
  });
}

export const toggleSearchKeyword = keyword => (dispatch, getState) =>{
  if (keyword && keyword.length > 0) {
    dispatch(setSearchKeyword(keyword));
    const notes = getState().notes;
    const filteredResult = filterNotes(notes, keyword)
    dispatch(setSearchCacheResult(filteredResult));
  } else {
    dispatch(setSearchKeyword(''));
    dispatch(setSearchCacheResult(null));
  }
};

export const setSearchCacheResult = notes => ({
  type: SET_SEARCH_CACHE_RESULT,
  payload: { notes }
})

export const setSearchKeyword = keyword => ({
  type: SET_SEARCH_KEYWORD,
  payload: { keyword },
});

const initialState = {
  keyword: '',
  cacheResult: null,
};

export default function searchReducers(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: action.payload.keyword,
      };

    case SET_SEARCH_CACHE_RESULT:
      return {
        ...state,
        cacheResult: action.payload.notes,
      };
      
    default:
      return state;
  }
}