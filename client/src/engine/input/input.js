import camera from '../rendering/camera'
import { GRID_SIZE } from '../rendering/renderer';
import engine from '../engine';
import eventManager from '../eventManager';

const down = {};
let currrentMousePosition = {x:0,y:0}
const keypressHandler = (e) => {
  down[e.which] = true
}

const keyupHandler = (e) => {
  delete down[e.which];
}

const mouseDownHandler = (e) => {
  eventManager.triggerEvent('mousedowngrid', mousePositionToGrid(e.clientX, e.clientY));
}


const mouseUpHandler = (e) => {
  eventManager.triggerEvent('mouseupgrid', mousePositionToGrid(e.clientX, e.clientY));
}

const mouseMoveHandler = (e) => {
  currrentMousePosition = mousePositionToGrid(e.clientX,e.clientY)
}


export const isKeyDown = (key) => {
  return (key in down);
}

export const getMousePosition = () => {
  return currrentMousePosition;
}

const mousePositionToGrid = (screenX, screenY) => {
  const xLim = camera.data.x - window.innerWidth / GRID_SIZE;
  const yLim = camera.data.y - window.innerHeight / GRID_SIZE;
  return {
    x: xLim + screenX*2 / GRID_SIZE + 0.5,
    y: yLim + screenY*2 / GRID_SIZE + 0.5
  }
}


export const startCapturingInput = () => {
  window.addEventListener('keydown', keypressHandler);
  window.addEventListener('keyup', keyupHandler);
  window.addEventListener('mousedown', mouseDownHandler);
  window.addEventListener('mouseup', mouseUpHandler);
  window.addEventListener('mousemove', mouseMoveHandler)
  eventManager.registerEvent('mousedowngrid');
  eventManager.registerEvent('mouseupgrid');

}