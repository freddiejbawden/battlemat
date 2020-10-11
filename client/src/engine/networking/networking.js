import io from 'socket.io-client';
import MessageTypes from './messageTypes'
import { processMapUpdate } from '../statemanagement/state'


export const socket = io(`ws://${window.location.host}`);

export const connectToServer = () => socket.on('connect', () => {
    console.log('connected');
    socket.on('game-update', processMapUpdate)
})


export const createEntityUpdate = (id,x,y) => {
  socket.emit('update-entity', {id, x,y})
}
