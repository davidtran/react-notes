import React from 'react';
import { FaFont } from 'react-icons/fa';
import { upperFirst } from 'lodash';
import styled from 'styled-components';
import ToggleDropdownButton from './ToggleDropdownButton';

const BLOCK_TYPES = [  
  {
    name: 'header-one',
    label: 'Title',
  },
  {
    name: 'header-two',
    label: 'Heading',
  },
  {
    name: 'unstyled',
    label: 'body',
  },
  {
    name: 'unordered-list-item',
    label: 'Unordered list',
  },
  {
    name: 'ordered-list-item',
    label: 'Order list',
  }
];

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;  
  position: relative;
`;

const CheckMark = styled.div`
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
`;

const getDropdownItems = (selectedBlockTypes, toggleBlockType) => {
  return BLOCK_TYPES.map(blockType => (
    <Item 
      key={blockType.name} 
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(1);
        toggleBlockType(blockType.name);
      }}      
    >
      { selectedBlockTypes.indexOf(blockType.name) !== -1 && <CheckMark>-</CheckMark> } 
      { upperFirst(blockType.label) }
    </Item>
  ));
}

const TextFormatButton = ({ selectedBlockTypes, toggleBlockType }) => (
  <ToggleDropdownButton
    label={(<FaFont />)}
    dropdownItems={getDropdownItems(selectedBlockTypes, toggleBlockType)}
  />
);

export default TextFormatButton;
