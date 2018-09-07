import { connect } from 'react-redux';
import { toggleSearchKeyword } from '../reducers/search';
import SearchBox from '../components/Header/SearchBox';

const mapStateToProps = state => ({
  keyword: state.search.keyword,
});

const mapDispatchToProps = {
  search: toggleSearchKeyword,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
