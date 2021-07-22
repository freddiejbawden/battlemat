import GameObject from '../engine/gameObject'
import Camera from '../engine/rendering/camera'
import { isKeyDown } from '../engine/input/input';
import eventManager from '../engine/eventManager';
import { GRID_SIZE } from '../engine/rendering/renderer';

const TIME_UNTIL_MOVE = 500;

export default class CameraMovement extends GameObject {
  constructor() {
    super();
    
    this.speed = 0.1;
    this.movement = {x:0, y:0}
    this.lastMousePosition = {x:0, y:0}
    this.currentMousePosition = {x:0, y:0}
    this.isMouseDown = false
    this.mouseDownTimeout = null
    this.disableMouseMovement = false;
    eventManager.registerListener('mousemoveraw', (e) => {
      this.movement = {
        x: -e.movementX*4 / GRID_SIZE,
        y: -e.movementY*4 / GRID_SIZE
      }
    })
    eventManager.registerListener('mousedowngrid', () => {
      if (!this.disableMouseMovement) {
        this.isMouseDown = true
        clearTimeout(this.mouseDownTimeout)
        this.mouseDownTimeout = setTimeout(() => {
          this.isMouseDown = true
        }, TIME_UNTIL_MOVE)
      }
    })
    eventManager.registerListener('mouseupgrid', () => {
      clearTimeout(this.mouseDownTimeout)
      this.isMouseDown = false
    })
    eventManager.registerListener('disable-mouse', () => {
      this.disableMouseMovement = true;
    })
    eventManager.registerListener('enable-mouse', () => {
      this.disableMouseMovement = false;
    })
  }


  update() {
    // check keys for camera
    if (isKeyDown(65)) {
      this.movement.x = -0.1;
    }
    if (isKeyDown(68)) {
      this.movement.x = 0.1 
    }
    if (isKeyDown(87)) {
      this.movement.y = -0.1 
    }
    if (isKeyDown(83)) {
      this.movement.y = 0.1 
    }
    if (this.isMouseDown) {
      Camera.updatePosition({
        x: Camera.x + (this.movement.x),
        y: Camera.y + (this.movement.y)
      })
    }
    this.movement = {x:0, y:0}
  }

}