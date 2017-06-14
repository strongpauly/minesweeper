import React, { Component } from 'react';
import Cell from './Cell';

class Grid extends Component {

  constructor(props) {
      super(props);
      let mines = new Map();
      let adjacentCount = new Map();
      for (let mineNumber = 0; mineNumber < props.numMines; mineNumber ++) {
          let setMine = false;
          while(!setMine) {
              let x = Math.round(Math.random() * (props.width - 1));
              let y = Math.round(Math.random() * (props.height - 1));
              let key = this.getCellKey(x, y);
              if(!mines.has(key)) {
                  mines.set(key, {x: x, y:y});
                  setMine = true;
              }
          }
      }
      mines.forEach(mine => {
          for (let x = mine.x - 1; x <= mine.x + 1; x++) {
              for (let y = mine.y - 1; y <= mine.y + 1; y++) {
                  if( (x !== mine.x || y !== mine.y) && this.validCoord(x, y)) {
                      let key = this.getCellKey(x, y);
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
          mines: mines
      }
      this.onCheck = this.onCheck.bind(this);
  }

  /**
   * Helper function to determine whether a coordinate appears inside the bounds of the grid.
   */
  validCoord(x, y) {
      return x >= 0 && y >= 0 && x < this.props.width && y < this.props.height
  }

  getCellKey(x, y) {
      return x + ',' + y;
  }

  onCheck(cellX, cellY) {
      let key = this.getCellKey(cellX, cellY)
      if(this.state.mines.has(key)) {
          this.setState({exploded:true});
      } else {
          this.state.checked.add(key);
          this.expand(cellX, cellY);
          this.setState({checked: this.state.checked});
      }
  }

  expand(cellX, cellY) {
      let count = this.state.adjacentCount.get(this.getCellKey(cellX, cellY));
      if (count === undefined) {
          for (let x = cellX - 1; x <= cellX + 1; x++) {
              for (let y = cellY - 1; y <= cellY + 1; y++) {
                  if( (x !== cellX || y !== cellY) && this.validCoord(x, y)) {
                      let key = this.getCellKey(x, y);
                      if(!this.state.mines.has(key) && !this.state.checked.has(key)) {
                          this.state.checked.add(key);
                          this.expand(x, y);
                      }
                  }
              }
          }
      }
  }

  render() {
    let widthArray = new Array(this.props.width).fill();
    let heightArray = new Array(this.props.height).fill();
    let cells = heightArray.map((emptyY, y) => {
        let row = widthArray.map((emptyX, x) => {
            let key = this.getCellKey(x, y);
            return <Cell key={key} x={x} y={y}
                mine={this.state.mines.has(key)}
                checked={this.state.checked.has(key)}
                marked={this.state.marked.has(key)}
                adjacentCount={this.state.adjacentCount.get(key)}
                onCheck={this.onCheck}></Cell>
        });
        return <tr className="row" key={'row' + y}>{row}</tr>
    });
    return <table className={this.state.exploded ? 'grid exploded' : 'grid'}><tbody>{cells}</tbody></table>
  }
}

export default Grid;
