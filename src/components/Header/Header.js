import React from 'react';
import styled from 'styled-components';
import SearchBox from '../../containers/SearchBox';
import TextFormatButton from '../../containers/TextFormatButton';
import Button from './Button';
import { FaPlus, FaTrash } from 'react-icons/fa';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(0deg, #d8d8d8, #ececec);
  border-bottom: 1px thin rgba(0, 0, 0, 0.2);
  border-radius: 7px 7px 0 0;
  min-height: 30px;
  padding: 0 5px;
`;

const Toolbar = styled.div`
  display: flex;  
  position: relative;    
`;

const Header = ({ addNote, removeCurrentNote, activeNoteId }) => (
  <Container> 
    <Toolbar>
      <Button onClick={addNote}>
        <FaPlus />
      </Button>
      <Button onClick={removeCurrentNote} disabled={!activeNoteId}>
        <FaTrash />
      </Button>
    </Toolbar>   
    <Toolbar> 
      <TextFormatButton /> 
      <SearchBox />
    </Toolbar>
  </Container>
);

export default Header;
