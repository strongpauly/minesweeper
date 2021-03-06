import React, { Component } from 'react';
import Cell from './Cell';
import Set from 'betterset';
import PropTypes from 'prop-types';

import getCellKey from './lib/getCellKey';

export default class Game extends Component {

  static propTypes = {
    onRestart: PropTypes.func,
    mines: PropTypes.object
  }

  constructor(props) {
    super(props);
    let mines = props.mines.mines;
    let adjacentCount = new Map();
    mines.forEach(mine => {
      for (let x = mine.x - 1; x <= mine.x + 1; x++) {
        for (let y = mine.y - 1; y <= mine.y + 1; y++) {
          if( (x !== mine.x || y !== mine.y) && this.validCoord(x, y)) {
            let key = getCellKey(x, y);
            let count = adjacentCount.get(key);
            if (count === undefined) {
              count = 0;
            }
            count ++;
            adjacentCount.set(key, count);
          }
        }
      }
    });
    this.state = {
      exploded: false,
      checked: new Set(),
      marked: new Set(),
      adjacentCount: adjacentCount,
      mines: mines,
      completed: props.mines.width * props.mines.height === mines.size
    };

    this.onCheck = this.onCheck.bind(this);
    this.onMark = this.onMark.bind(this);
    this.restart = this.restart.bind(this);
  }

  /**
   * Helper function to determine whether a coordinate appears inside the bounds of the grid.
   */
  validCoord(x, y) {
    return x >= 0 && y >= 0 && x < this.props.mines.width && y < this.props.mines.height;
  }

  getCellCoord(key) {
    let split = key.split(',');
    return {x:parseInt(split[0], 10), y: parseInt(split[1], 10)};
  }

  startTimer() {
    if(!this.timerId) {
      this.setState({time: 1});
      this.timerId = setInterval(() => {
        this.setState((previousState) => ({
          time:previousState.time + 1
        }));
      }, 1000);
    }
  }

  stopTimer() {
    if(this.timerId) {
      clearInterval(this.timerId);
      delete this.timerId;
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  onCheck(cellX, cellY) {
    if(!this.state.completed) {
      this.startTimer();
      let key = getCellKey(cellX, cellY);
      if(this.state.mines.has(key)) {
        this.setState({exploded:true, completed:true});
        this.stopTimer();
      } else {
        this.doCheck(key);
        if(this.hasWon()) {
          this.setState({completed:true});
          this.stopTimer();
        }
        this.setState({
          checked: this.state.checked,
          marked: this.state.marked
        });
      }
    }
  }

  onMark(cellX, cellY, mark) {
    if(!this.state.completed) {
      this.startTimer();
      let key = getCellKey(cellX, cellY);
      if(mark) {
        this.state.marked.add(key);
      } else {
        this.state.marked.delete(key);
      }
      this.setState({marked: this.state.marked});
    }
  }

  doCheck(cellKey) {
    let checking = new Set([cellKey]);
    while (checking.size > 0) {
      //Effectively checking.pop();
      let key = checking[Symbol.iterator]().next().value;
      checking.delete(key);
      this.state.checked.add(key);
      //Stop when we get close to a mine.
      if(!this.state.adjacentCount.has(key)) {
        let coord = this.getCellCoord(key);
        checking.addAll(
          //       x-1 x   x+1
          // y-1   X   X   X
          // y     X   O   X
          // y+1   X   X   X
          [
            {x: coord.x - 1, y: coord.y - 1},
            {x: coord.x - 1, y: coord.y},
            {x: coord.x - 1, y: coord.y + 1},
            {x: coord.x, y: coord.y - 1},
            {x: coord.x, y: coord.y + 1},
            {x: coord.x + 1, y: coord.y - 1},
            {x: coord.x + 1, y: coord.y},
            {x: coord.x + 1, y: coord.y + 1}
          ].filter(newCoord => {
            let newKey = getCellKey(newCoord.x, newCoord.y);
            return this.validCoord(newCoord.x, newCoord.y) &&
              !this.state.mines.has(newKey) &&
              !this.state.checked.has(newKey) &&
              !this.state.marked.has(newKey);
          }).map(newCoord => getCellKey(newCoord.x, newCoord.y))
        );
      }
    }
  }

  restart() {
    this.props.onRestart();
  }

  hasWon() {
    //Only mines showing.
    return (this.props.mines.width * this.props.mines.height) - this.state.checked.size === this.props.mines.mines.size;
  }

  render() {
    let widthArray = new Array(this.props.mines.width).fill();
    let heightArray = new Array(this.props.mines.height).fill();
    let cells = heightArray.map((emptyY, y) => {
      let row = widthArray.map((emptyX, x) => {
        let key = getCellKey(x, y);
        return <Cell key={key} x={x} y={y}
          mine={this.state.exploded && this.state.mines.has(key)}
          checked={this.state.checked.has(key)}
          marked={this.state.marked.has(key)}
          adjacentCount={this.state.adjacentCount.get(key)}
          onCheck={this.onCheck}
          onMark={this.onMark}></Cell>;
      });
      return <tr className="row" key={'row' + y}>{row}</tr>;
    });
    return <div className="gridContainer">
      <div>
        <div className="header">
          <div className="numMines">{this.props.mines.mines.size - this.state.marked.size}</div>
          <div className="status" onClick={this.restart}>{this.state.exploded ? String.fromCharCode(9760) : this.state.completed ? '✔' : String.fromCharCode(9822)}</div>
          <div className="timer">{this.state.time || ' '}</div>
        </div>
        <table className={this.state.completed ? 'grid completed' : 'grid'}>
          <tbody>{cells}</tbody>
        </table>
      </div>
    </div>;
  }
}
