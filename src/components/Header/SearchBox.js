import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Container = styled.div`
  border-bottom: 1px solid #b1aeb1;
  background: white;  
  position: relative;
  width: 200px;
  height: 20px;
  border-radius: 5px;

  ${props => props.isFocused && css`
    outline: -webkit-focus-ring-color auto 5px;
  `}
`;

const InputGroup = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  padding-right: 5px;  

  ${props => props.isFocused && css`       
    left: 10px;
    transform: translate(0, -50%);
  `}
`;

const Input = styled.input`
  border: none;
  background: transparent;    
  font-size: 13px;
  width: 100%;  
  outline: none;
  flex-grow: 1;
`;

const SearchIcon = styled(FaSearch)`
  margin-right: 5px;
  color: gray;
  font-size: 12;
`;

const RemoveTextIcon = styled(FaTimesCircle)`
  color: gray;
  font-size: 12;
  cursor: pointer;  
`;

class SearchBox extends Component {

  state = { isFocused: false }

  onChange = (e) => {
    const { search } = this.props;
    search(e.target.value);
  }

  onFocus = () => this.setState({ isFocused: true });

  onBlur = () => {
    const { search } = this.props;
    this.setState({ isFocused: false });
    search(null);
  }

  deleteSearchKeyword = (e) => {
    e.preventDefault();
    const { search } = this.props;
    search(null);
  }

  render() {
    const { isFocused } = this.state;
    const { keyword } = this.props;

    return (
      <Container isFocused={isFocused} innerRef={el => this.containerEl = el}>
        <InputGroup isFocused={isFocused || (keyword && keyword.length > 0)}>
          <SearchIcon />
          <Input
            placeholder="Search"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={keyword || ''}
            onChange={this.onChange}
          />
          {keyword && keyword.length > 0 &&
            <RemoveTextIcon onClick={this.deleteSearchKeyword} />
          }
        </InputGroup>

      </Container>
    )
  }
}

SearchBox.propTypes = {
  search: PropTypes.func.isRequired,
  keyword: PropTypes.string,
}

export default SearchBox;
