import React, { Component } from 'react';

import './App.css';

import Dice from './components/Dice';
import Message from './components/Message';
import Players from './components/Players';
import Reset from './components/Reset';
import Roll from './components/Roll';
import ToggleScores from './components/ToggleScores'
import ScoreSheet from './components/ScoreSheet/ScoreSheet';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Message />
        <Dice />
        <div className="controls">
          <Reset />
          <Roll />
          <ToggleScores />
        </div>
        <Players />
        <ScoreSheet />
      </main>
    );
  }
}

export default App;
