import io from 'socket.io-client';
import MessageTypes from './messageTypes'
import processMapUpdate from '../statemanagement/state'

const socket = io(`ws://${window.location.host}`);

const establishCallbacks = () => {
  socket.on(MessageTypes.MAP_UPDATE, processMapUpdate);  
}

const updateToken = 

  socket.on('connect', () => {
    console.log('connected');
  })

