import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Game from './Game';
import propTypes from 'prop-types';

export default class App extends Component {

  static propTypes = {
    width: propTypes.number,
    height: propTypes.number,
    numMines: propTypes.number
  }

  constructor(props) {
    super(props);
    this.restart = this.restart.bind(this);
    this.state = {
      width: props.width || 20,
      height: props.height || 20,
      numMines: props.numMines !== undefined ? props.numMines : 30,
      gameId: 0
    };
  }

  restart() {
    this.setState({gameId: this.state.gameId + 1});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo spinning" alt="logo" />
          <h2>Minesweeper!</h2>
        </div>
        <Game key={this.state.gameId}
            gameId={this.state.gameId}
            width={this.state.width}
            height={this.state.height}
            numMines={this.state.numMines}
            onRestart={this.restart}></Game>
      </div>
    );
  }
}
