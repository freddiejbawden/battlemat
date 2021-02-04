import GameObject from '../engine/gameObject'
import Camera from '../engine/rendering/camera'
import { isKeyDown } from '../engine/input/input';
import eventManager from '../engine/eventManager';
import { GRID_SIZE } from '../engine/rendering/renderer';

export default class CameraMovement extends GameObject {
  constructor() {
    super();
    this.speed = 0.1;
    this.movement = {x:0, y:0}
    this.lastMousePosition = {x:0, y:0}
    this.currentMousePosition = {x:0, y:0}
    this.isMouseDown = false
    eventManager.registerListener('mousemoveraw', (e) => {
      this.movement = {
        x: -e.movementX*4 / GRID_SIZE,
        y: -e.movementY*4 / GRID_SIZE
      }
    })
    eventManager.registerListener('mousedowngrid', () => {
      this.isMouseDown = true
    })
    eventManager.registerListener('mouseupgrid', () => {
      this.isMouseDown = false
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