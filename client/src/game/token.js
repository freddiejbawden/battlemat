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
    if (pos.x === this.position.x && pos.y === this.position.y) {
      this.isMouseDown = true;
    }
  } 
  
  mouseUp() {
    this.isMouseDown && createEntityUpdate(this.id, getMousePosition().x, getMousePosition().y)
    this.isMouseDown = false;
  }

  update() {
    
  }
}