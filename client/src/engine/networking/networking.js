import io from 'socket.io-client';
import MessageTypes from './messageTypes'
import { handleIncomingMessage } from '../statemanagement/state'


export const socket = io(`ws://${window.location.host}`);

export const connectToServer = () => socket.on('connect', () => {
    console.log('connected');
    socket.on('game-update', handleIncomingMessage)
})

export const addEntity = (id,entity) => {
  socket.emit('add-entity', id, entity)
}

export const createEntityUpdate = (id,x,y, size) => {
  socket.emit('update-entity', {id, x,y})
}
