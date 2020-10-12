import eventManager from '../engine/eventManager';
import GameObject from '../engine/gameObject'
import { getMousePosition } from '../engine/input/input';
import {createEntityUpdate} from '../engine/networking/networking'

export default class Token extends GameObject {
  constructor(id, x, y, sprite, size) {
    super(id,x,y,sprite,size);
    console.log(`id: ${this.id}`)
    this.isMouseDown = false;
  }

  start() {
    eventManager.registerListener('mousedowngrid', (pos) => this.mouseDown(pos))
    eventManager.registerListener('mouseupgrid', (pos) => this.mouseUp(pos))
  }
  mouseDown(pos) {
    this.isMouseDown = true;
  } 
  
  mouseUp() {
    createEntityUpdate(this.id, getMousePosition().x, getMousePosition().y)
  }

  update() {
    
  }
}