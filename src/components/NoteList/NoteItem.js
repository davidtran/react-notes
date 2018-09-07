import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlighter';

const Container = styled.div`
  padding: 10px 10px 10px 25px;  
  position: relative;
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    left: 20px;
    bottom: 0;
    background: #ededeb;
  }

  ${props => props.isActive && css`
    ::before {
      content: '';
      position: absolute;
      top: -1px;
      bottom: -1px;
      left: 0;
      right: 0;
      background-color: #fde18d;  
      z-index: 5;
    }    
  `}
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
`

const Title = styled.div`
  position: relative;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
  z-index: 10;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;  
  font-size: 13px;
`;

const Date = styled.div`
  margin-right: 10px;
`;

const Description = styled.div`
  flex-grow: 1;
  color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const getDateText = date => {
  const momentDate = moment(date);
  if (momentDate.isSame(new Date(), 'day')) {
    return momentDate.format('HH:mm');
  }
  if (momentDate.isSame(new Date(), 'week')) {
    return momentDate.format('dddd');
  }
  return momentDate.format('DD/MM/YYYY');
};

const getTitleAndDescription = noteContent => {
  const content = noteContent.getCurrentContent().getPlainText();
  const textArray = content.split('\n');
  const title = textArray[0] !== '' ? textArray[0] : null;
  const description = textArray.length > 0 && textArray[1] || null;
  return { title, description };
}

const NoteItem = ({ note, isActive, onClick, searchKeyword }) => {
  const { title, description } = getTitleAndDescription(note.content);

  return (
    <Container
      isActive={isActive}
      onMouseDown={(e) => {
        e.stopPropagation();
        onClick(note.id);
      }}
    >
      <Content>
        <Title>
          <Highlighter search={title && searchKeyword}>
            {title || 'New Note'}
          </Highlighter>

        </Title>
        <Info>
          <Date>{getDateText(note.updatedAt)}</Date>
          <Description>
            <Highlighter search={description && searchKeyword}>
              {description || 'No addition text'}
            </Highlighter>
          </Description>
        </Info>
      </Content>
    </Container>
  );
}

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string,
};

export default NoteItem;
