import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import './App.css';
import EventManager from '../engine/eventManager';
import engine from '../engine/engine';
import load from '../game/game'
const App = () => {
  useEffect(() => {
    load();
    engine.start();
  }, []);

  const listener = EventManager.registerListener('event-test', () => {
    console.log('i heard  that!');
  });
  EventManager.triggerEvent('event-test');
  EventManager.removeListener('event-test', listener);
  EventManager.triggerEvent('event-test');
  return (
    <div className="App">
       <canvas id="grid-canvas"></canvas>
       <canvas id="tokens-canvas"></canvas>
    </div>
  );
}

export default App;
