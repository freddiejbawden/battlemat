import React, { useState, useEffect } from 'react';
import './App.css';
import engine from '../engine/engine';
import load from '../game/game'
import { Grommet, Box } from 'grommet';
import ObjectTray from './ObjectTray';
import theme from './theme'
import DetailsTab from './DetailsTab/DetailsTab';
const App = () => {
  useEffect(() => {
    load();
    engine.start();
  }, []);

  console.log(theme)

  return (
    <Grommet theme={theme}>
      <div  className="App">
        <canvas id="grid-canvas"></canvas>
        <canvas id="tokens-canvas"></canvas>
        <Box data-ignore-click="true" height="100vh" direction="column">
          <DetailsTab />
          <ObjectTray />
        </Box>
      </div>
    </Grommet>
  );
}

export default App;
