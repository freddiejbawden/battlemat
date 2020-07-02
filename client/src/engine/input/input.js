import EventManager from './../eventManager'
import { isBreakStatement } from 'typescript';

const keypressHandler = (e) => {
  // this is ugly
  console.log('p')
  switch (e.which) {
    case 65:
      EventManager.triggerEvent('camera-move', {x: 1, y:0});
      break;
    case 87:
      
      EventManager.triggerEvent('camera-move', {x: 0, y:1});
      break;
    case 68:
      EventManager.triggerEvent('camera-move', {x: -1, y:0});
      break;
    case 83:
      EventManager.triggerEvent('camera-move', {x: 0, y: -1});
      break;
  }
}


export const startCapturingInput = () => {
  window.addEventListener('keydown', keypressHandler);
}