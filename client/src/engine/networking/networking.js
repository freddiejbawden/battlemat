import io from 'socket.io-client';
import MessageTypes from './messageTypes'
import { updateState } from '../statemanagement/state'

const sequenceNumbers = {}

export const socket = io(`ws://${window.location.host}`);

export const connectToServer = () => socket.on('connect', () => {
  console.log('connect to server')  
  socket.on('game-update', handleIncomingMessage)
}
)

const handleIncomingMessage = (update) => {
  // move this to server
  const unpackedUpdated = 
    Object.keys(update.entities).map((key) => ({ id: key, ...update.entities[key] })).filter((unpackedUpdate) => {
      return true
    })
  updateState(unpackedUpdated)
}

export const addEntity = (id,entity) => {
  socket.emit('add-entity', id, entity)
}

export const emitToServer = (message, data={}) => {
  if (!data.id) {
    console.error('Cannot emitToServer: There is no id to track sequence number for!')
    return;
  }
  const sequenceNumber = sequenceNumbers[data.id] || 0;
  const sequencedData = {
    sequenceNumber: (sequenceNumber+1),
    ...data
  }
  socket.emit(message, sequencedData)
  sequenceNumbers[data.id] = sequenceNumber + 1
}

