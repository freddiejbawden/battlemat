import React, { useState, useEffect } from 'react';
import './App.css';
import EventManager from '../engine/eventManager';
import {Engine} from '../engine/engine';
const App = () => {
  useEffect(() => {
    let e = new Engine();
    e.start();
  });

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
