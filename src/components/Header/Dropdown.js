import React from 'react';
import styled from 'styled-components';

const StyleDropdown = styled.div`
  z-index: 2000;
  border-top: 1px solid #f3f1f3;
  border-bottom: 1px solid #b1aeb1;
  background: white;  
  box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.5);
  padding: 10px 0;
  position: absolute;
  left: 50%;
  top: calc(100% + 9px);
  transform: translateX(-50%);
  border-radius: 5px;
`;

const Triangle = styled.div`
  z-index: 2001;
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;  
  border-bottom: 10px solid white;  
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
`;

const DropdownItem = styled.div`
  padding: 5px 15px;
  color: #333;
  cursor: pointer;
  min-width: 100px;

  &:hover {
    color: white;
    background: blue;
  }
`;

const getChildArray = children => {
  let array = children;
  if (!Array.isArray(children)) {
    array = [children];
  }
  return array;
}

const Dropdown = ({ children }) => (
  <React.Fragment>
    <Triangle />    
    <StyleDropdown>
      {getChildArray(children).map(child => (
        <DropdownItem key={child.key}>{child}</DropdownItem>
      ))}
    </StyleDropdown>
  </React.Fragment>

)
export default Dropdown;
