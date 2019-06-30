import React from "react";
import Downshift from "mui-downshift";
import depts from "./depts";
import { isMobile } from "react-device-detect";

class DeptSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      filteredItems: depts,
      check: null
     };
      this.initial = {filteredItems: depts}; // Inital state is the whole list of depts
    this.handleStateChange = this.handleStateChange.bind(this);
    // this.check = null;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps !== this.props){
      if (nextProps.dept === null){
        this.setState(this.initial);
      }
    }
    return nextState !== this.state || nextProps !== this.props;
  }

  determineDropdownLength() {
    if (isMobile) {
      return 3;
    }
    // return document.documentElement.scrollHeight
    // - 96 - 24;
    return 6;
  }

  handleStateChange(changes) {
    console.log("HELLO", changes)
    // this.check = changes.inputValue;
    if (typeof changes.inputValue === "string") {
      // Match depts by label (ignoring case) and filter out the non matching depts
      const filteredItems = depts.filter(item =>
        item.label.toLowerCase().includes(changes.inputValue.toLowerCase())
      );
      this.setState({ filteredItems: filteredItems, check: changes.inputValue });
    }
  }
  defautlRen =()=>{
    console.log("HCEK IS ", this.check);
    if(true)//typeof this.check === "string")
    {
      return { label: this.props.dept, value: 0 };
    }
  }

  render() {
    return (
      <Downshift
        //inputValue={this.getInput()}
        items={this.state.filteredItems}
        onStateChange={this.handleStateChange}
        defaultSelectedItem={this.defautlRen()}
        onChange={this.props.setDept}
        getInputProps={() => ({
          // Downshift requires this syntax to pass down these props to the text field
          label: "Department",
          required: true
        })}
        //get label props
        //getInputProps={() => <input />}
        menuItemCount={this.determineDropdownLength()}
       // menuHeight={this.determineDropdownLength()}
        {...this.props} //Pass down other props to the Downshift layer
      />
    );
  }
}
export default DeptSearchBar;
