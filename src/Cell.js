import React, { Component } from 'react';

class Cell extends Component {

  constructor(props) {
      super(props);
      this.checkCell = this.checkCell.bind(this);
  }

  checkCell(e) {
      //Can't check more than once.
      if (!this.props.checked) {
          this.props.onCheck(this.props.x, this.props.y)
      }
  }

  render() {
      let className = ["cell"];
      if (this.props.checked) {
          className.push("checked");
      } else if (this.props.marked) {
          className.push("marked");
      }
      let content = " ";
      if(this.props.mine) {
        content = "M";  
      } else if(this.props.adjacentCount !== undefined) {
          content = this.props.adjacentCount;
      }
      return <td className={ className.join(" ") } onClick={this.checkCell}>{ content }</td>
  }
}

export default Cell;
