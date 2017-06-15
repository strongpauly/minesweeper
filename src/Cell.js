import React, { Component } from 'react';
import mine from './mine.svg';
import PropTypes from 'prop-types';

class Cell extends Component {

  static propTypes = {
    checked: PropTypes.bool,
    marked: PropTypes.bool,
    onCheck: PropTypes.func,
    onMark:  PropTypes.func,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    adjacentCount: PropTypes.number,
    mine: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.checkCell = this.checkCell.bind(this);
    this.markCell = this.markCell.bind(this);
  }

  checkCell() {
      //Can't check more than once - don't allow checking before removing mark.
    if (!this.props.checked && !this.props.marked) {
      this.props.onCheck(this.props.x, this.props.y);
    }
  }

  markCell(e) {
    e.preventDefault();
    if(!this.props.checked) {
      this.props.onMark(this.props.x, this.props.y, !this.props.marked);
    }
  }

  render() {
    let className = ['cell'];
    let content = ' ';
    if (this.props.checked) {
      className.push('checked');
      if (this.props.adjacentCount !== undefined) {
        content = this.props.adjacentCount;
        className.push('count-' + this.props.adjacentCount);
      }
    } else if (this.props.marked) {
      className.push('marked');
      content = '!';
    }
    if(this.props.mine) {
      className.push('mine');
      if(this.props.marked) {
        content = 'X';
      } else {
        content = <img src={mine} className="mineImg spinning" alt="mine" />;
      }
    }
    return <td className={ className.join(' ') } onClick={this.checkCell} onContextMenu={this.markCell}>{ content }</td>;
  }
}

export default Cell;
