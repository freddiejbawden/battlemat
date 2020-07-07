import EventManager from './../eventManager'
import { socket } from '../networking/networking'

const down = {};

const keypressHandler = (e) => {
  // this is ugly
  socket.emit('update-entity', {id: 'tokenAD', x: 225, y: 125})
  down[e.which] = true
}

const keyupHandler = (e) => {
  delete down[e.which];
}

const mouseDownHandler = (e) => {
  EventManager.triggerEvent('mousedown', {e})
}

export const isKeyDown = (key) => {
  return (key in down);
}

export const startCapturingInput = () => {
  window.addEventListener('keydown', keypressHandler);
  window.addEventListener('keyup', keyupHandler);
  window.addEventListener('mousedown', mouseDownHandler);

}