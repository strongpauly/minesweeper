import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Grid from './Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Minesweeper!</h2>
        </div>
        <div className="gridContainer">
            <Grid width={10} height={10} numMines={10}></Grid>
        </div>
      </div>
    );
  }
}

export default App;
