import React, { Component } from 'react';
import mine from './mine.svg';

class Cell extends Component {

  constructor(props) {
      super(props);
      this.checkCell = this.checkCell.bind(this);
      this.markCell = this.markCell.bind(this);
  }

  checkCell(e) {
      //Can't check more than once.
      if (!this.props.checked) {
          this.props.onCheck(this.props.x, this.props.y)
      }
  }

  markCell(e) {
      e.preventDefault();
      if(!this.props.checked) {
          this.props.onMark(this.props.x, this.props.y, !this.props.marked);
      }
  }

  render() {
      let className = ["cell"];
      let content = " ";
      if (this.props.checked) {
          className.push("checked");
          if (this.props.adjacentCount !== undefined) {
              content = this.props.adjacentCount;
              className.push("count-" + this.props.adjacentCount);
          }
      } else if (this.props.marked) {
          className.push("marked");
          content = "F";
      }
      if(this.props.mine) {
          className.push("mine");
          if(this.props.marked) {
              content = "X"
          } else {
              content = <img src={mine} className="mineImg" alt="mine" />;
          }
      }
      return <td className={ className.join(" ") } onClick={this.checkCell} onContextMenu={this.markCell}>{ content }</td>
  }
}

export default Cell;
