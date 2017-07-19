import React, { Component } from 'react';
import './App.css';

import Game from './Game';
import propTypes from 'prop-types';
import generateMines from './lib/generateMines';

export default class App extends Component {

  static propTypes = {
    width: propTypes.number,
    height: propTypes.number,
    numMines: propTypes.number
  }

  constructor(props) {
    super(props);
    this.restart = this.restart.bind(this);
    const width = props.width || 20;
    const height = props.height || 20;
    const numMines = props.numMines !== undefined ? props.numMines : 30;
    this.state = {
      width: width,
      height: height,
      numMines: numMines,
      mines: generateMines(numMines, width, height),
      gameId: 0
    };
  }

  restart() {
    this.setState({gameId: this.state.gameId + 1});
  }

  render() {
    return (
      <div className="App">
        <Game key={this.state.gameId}
            gameId={this.state.gameId}
            mines={this.state.mines}
            onRestart={this.restart}></Game>
      </div>
    );
  }
}
