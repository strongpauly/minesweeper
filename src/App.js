import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Game from './Game';

class App extends Component {

  constructor(props) {
    super(props);
    this.restart = this.restart.bind(this);
    this.state = {
      width: 20,
      height: 20,
      numMines: 30,
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

export default App;
