import { convertCompilerOptionsFromJson } from 'typescript';
import eventManager from '../engine/eventManager';
import GameObject from '../engine/gameObject'
import { getMousePosition } from '../engine/input/input';


export default class Token extends GameObject {
  constructor(id, x, y, sprite, size) {
    super(id,x,y,sprite,size);
    this.isMouseDown = false;
  }

  start() {
    console.log('token start')
    eventManager.registerListener('mousedowngrid', (pos) => this.mouseDown(pos))
    eventManager.registerListener('mouseupgrid', (pos) => this.mouseUp(pos))
  }
  mouseDown(pos) {
    console.log(`mouse down on ${this.id} at pos ${pos.x}`)
    this.isMouseDown = true;
  } 
  
  mouseUp() {
    console.log(`mouse up on ${this.id}`)
    this.isMouseDown = false;
  }

  update() {
    
  }
}