import GameObject from '../engine/gameObject'
import Camera from '../engine/rendering/camera'
import { isKeyDown } from '../engine/input/input';

export default class CameraMovement extends GameObject {
  constructor() {
    super();
    this.speed = 0.1;
  }
  update() {
    const movement = {x:0, y:0}
    // check keys for camera
    if (isKeyDown(65)) {
      movement.x = -1;
    }
    if (isKeyDown(68)) {
      movement.x = 1 
    }
    if (isKeyDown(87)) {
      movement.y = -1 
    }
    if (isKeyDown(83)) {
      movement.y = 1 
    }
    if (movement.x !== 0 || movement.y !== 0){
      Camera.updatePosition({
        x: Camera.x + (movement.x * this.speed),
        y: Camera.y + (movement.y * this.speed)
      })
    }
  }

}