import React, { useState, useEffect } from 'react';
import './App.css';
import EventManager from '../engine/eventManager';
import engine from '../engine/engine';
import load from '../game/game'
import { Grommet } from 'grommet';
import ObjectTray from './ObjectTray';
import theme from './theme'
const App = () => {
  useEffect(() => {
    load();
    engine.start();
  }, []);

  return (
    <Grommet theme={theme}>
      <div className="App">
        <canvas id="grid-canvas"></canvas>
        <canvas id="tokens-canvas"></canvas>
        <ObjectTray />
      </div>
    </Grommet>
  );
}

export default App;
