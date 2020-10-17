import eventManager from '../engine/eventManager';
import GameObject from '../engine/gameObject'
import { getMousePosition } from '../engine/input/input';
import {createEntityUpdate} from '../engine/networking/networking'

export default class Token extends GameObject {
  constructor(id, x, y, sprite, size) {
    super(id,x,y,sprite,size);
    this.isMouseDown = false;
  }

  start() {
    eventManager.registerListener('mousedowngrid', (pos) => this.mouseDown(pos))
    eventManager.registerListener('mouseupgrid', (pos) => this.mouseUp(pos))
  }
  mouseDown(pos) {
    if (Math.floor(pos.x) === this.position.x && Math.floor(pos.y) === this.position.y) {
      this.isMouseDown = true;
    }
  } 
  
  mouseUp() {
    this.isMouseDown && createEntityUpdate(this.id, Math.floor(getMousePosition().x), Math.floor(getMousePosition().y))
    super.updatePosition = true;
    this.isMouseDown = false;
  }

  update() {
    if (this.isMouseDown) {
      const newPosition = {
        x: getMousePosition().x - 0.5,
        y: getMousePosition().y - 0.5
      }
      createEntityUpdate(this.id, newPosition.x, newPosition.y)
    }
  }
}