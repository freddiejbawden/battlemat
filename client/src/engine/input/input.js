import camera from '../rendering/camera'
import { GRID_SIZE } from '../rendering/renderer';
import engine from '../engine';

const down = {};

const keypressHandler = (e) => {
  down[e.which] = true
}

const keyupHandler = (e) => {
  delete down[e.which];
}

const mouseDownHandler = (e) => {
  const mouseX = e.clientX
  const mouseY = e.clientY
  let xLim = camera.data.x - window.innerWidth / GRID_SIZE;
  let yLim = camera.data.y - window.innerHeight / GRID_SIZE;
  const clickedPosition = {
    x: Math.floor(xLim + mouseX*2 / GRID_SIZE + 0.5 ),
    y: Math.floor(yLim + mouseY*2 / GRID_SIZE + 0.5)
  }
  console.log(clickedPosition)
  Object.keys(engine.getGameObjects()).forEach((id) => {
    const objectPos = engine.getGameObject(id).position;
    if (objectPos.x === clickedPosition.x && objectPos.y === clickedPosition.y) {
      console.log('hit')
      engine.getGameObject(id).click()
    }
  })
}

export const isKeyDown = (key) => {
  return (key in down);
}

export const startCapturingInput = () => {
  window.addEventListener('keydown', keypressHandler);
  window.addEventListener('keyup', keyupHandler);
  window.addEventListener('mousedown', mouseDownHandler);

}