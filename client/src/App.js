import React from 'react';
import io from 'socket.io-client';
import './App.css';

const App = () => {
  const socket = io();
  socket.on('connect', () => {
    console.log('connected');
  })
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shaba doo</h1>
      </header>
    </div>
  );
}

export default App;
