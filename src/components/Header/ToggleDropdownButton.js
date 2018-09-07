import React, { Component } from 'react';
import Button from './Button';
import Dropdown from './Dropdown';

export default class ToggleDropdownButton extends Component {

  state = {
    isShowingDropdown: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside);
  }

  onClickOutside = (e) => {        
    if (this.state.isShowingDropdown && 
      this.buttonEl && 
      this.buttonEl.contains(e.target) === false) {      
      this.setState({ isShowingDropdown: false });
    }
  }

  toggleDropdown = () => this.setState({ isShowingDropdown: !this.state.isShowingDropdown });

  render() {
    const { label, dropdownItems } = this.props;
    const { isShowingDropdown } = this.state;

    return (
      <Button onClick={this.toggleDropdown} innerRef={el => this.buttonEl = el}>
        { label }   
        { isShowingDropdown && 
          <Dropdown>
            { dropdownItems }
          </Dropdown>
        }
      </Button>
    );
  }
}
