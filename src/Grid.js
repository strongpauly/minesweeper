import React, { Component } from 'react';
import Cell from './Cell';

class Grid extends Component {

  state = {
      exploded: false
  }

  constructor(props) {
      super(props);
      let mines = new Set();
      for (let mineNumber = 0; mineNumber < props.numMines; mineNumber ++) {
          let setMine = false;
          while(!setMine) {
              let x = Math.round(Math.random() * (props.width - 1));
              let y = Math.round(Math.random() * (props.height - 1));
              let key = x + ',' + y;
              if(!mines.has(key)) {
                  mines.add(key);
                  setMine = true;
              }
          }
      }
      this.state.mines = mines;
      this.onExplode = this.onExplode.bind(this);
  }

  onExplode() {
      this.setState({exploded:true});
  }

  render() {
    let widthArray = new Array(this.props.width).fill();
    let heightArray = new Array(this.props.height).fill();
    let cells = heightArray.map((emptyY, y) => {
        let row = widthArray.map((emptyX, x) => {
            let key = x + ',' + y;
            return <Cell key={key} x={x} y={y} isMine={this.state.mines.has(key)} onExplode={this.onExplode}></Cell>
        });
        return <tr className="row" key={'row' + y}>{row}</tr>
    });
    return <table className={this.state.exploded ? 'grid exploded' : 'grid'}><tbody>{cells}</tbody></table>
  }
}

export default Grid;
