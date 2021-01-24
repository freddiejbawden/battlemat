import camera from '../rendering/camera'
import { GRID_SIZE } from '../rendering/renderer';
import eventManager from '../eventManager';

const down = {};
let currentMousePositionCentreGrid = {x:0,y:0}
let currentMousePositionIntersection = {x:0,y:0}

const keypressHandler = (e) => {
  down[e.which] = true
}

const keyupHandler = (e) => {
  delete down[e.which];
}

function getAllElementsFromPoint(x, y) {
  var elements = [];
  var display = [];
  var item = document.elementFromPoint(x, y);
  while (item && item !== document.body && item !== window && item !== document && item !== document.documentElement) {
      elements.push(item);
      display.push(item.style.display);
      item.style.display = "none";
      item = document.elementFromPoint(x, y);
  }
  // restore display property
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = display[i];
  }
  return elements;
}


const mouseDownHandler = (e) => {
  let trigger = null
  // Drilldown through elements as there might be empty space which is covered by the div container
  const elements = getAllElementsFromPoint(e.clientX, e.clientY)
  while(trigger === null && elements.length > 0) {
    // pop off first element
    const element = elements.shift();
    if (!element.getAttribute('data-ignore-click') && element.id !== "grid-canvas") {
      trigger =false;
    }
    if (!element.getAttribute('data-ignore-click') && element.id === "grid-canvas") {
      trigger = true
    }
  }
  if (trigger) eventManager.triggerEvent('mousedowngrid', mousePositionToCentreGrid(e.clientX, e.clientY)); 
}


const mouseUpHandler = (e) => {
  eventManager.triggerEvent('mouseupgrid', mousePositionToCentreGrid(e.clientX, e.clientY));
}

const mouseMoveHandler = (e) => {
  currentMousePositionCentreGrid = mousePositionToCentreGrid(e.clientX,e.clientY)
  currentMousePositionIntersection = mousePositionToIntersection(e.clientX,e.clientY)
}

export const isKeyDown = (key) => {
  return (key in down);
}

export const getMousePositionIntersection = () => currentMousePositionIntersection;

export const getMousePositionCentreGrid = () => {
  return currentMousePositionCentreGrid;
}

const mousePositionToIntersection = (screenX, screenY) => {
  const xLim = camera.data.x - window.innerWidth / GRID_SIZE;
  const yLim = camera.data.y - window.innerHeight / GRID_SIZE;
  return {
    x: Math.floor(xLim + screenX*2 / GRID_SIZE) + 1.5,
    y: Math.floor(yLim + screenY*2 / GRID_SIZE) + 1.5
  }
}

const mousePositionToCentreGrid = (screenX, screenY) => {
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