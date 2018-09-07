import React from 'react';
import styled from 'styled-components';
import Header from '../containers/Header';
import NoteList from '../containers/NoteList';
import NoteEditor from '../containers/NoteEditor';

const Container = styled.div`  
  font-family: 'Roboto', sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  max-width: 90%;
  height: 500px;
  max-height: 80%;
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.2);  
  border: 1px solid #acacac;
  border-radius: 7px; 
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Main = styled.div`
  display: flex;  
  background: #fafaf8;
  flex-grow: 1;
  position: relative;
`;

const NoteListContainer = styled.div`
  position: relative;
  min-width: 250px;
  width: 250px;
  overflow: scroll;
  min-height: 100%;
`;

const NoteEditorContainer = styled.div`
  flex-grow: 1;
`


const Window = () => (
  <Container>
    <Header />
    <Main>
      <NoteListContainer>
        <NoteList />
      </NoteListContainer>
      <NoteEditorContainer>
        <NoteEditor />
      </NoteEditorContainer>

    </Main>
  </Container>
);

export default Window;