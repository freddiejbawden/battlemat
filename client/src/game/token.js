import eventManager from '../engine/eventManager';
import Sprite from '../engine/sprite'
import { getMousePositionCentreGrid } from '../engine/input/input';
import {createEntityUpdate} from '../engine/statemanagement/state'

export default class Token extends Sprite {
  constructor(id, x, y, sprite, size) {
    super(id,x,y,sprite,size);
    this.isMouseDown = false;
  }

  mouseDown(pos) {
    if (Math.floor(pos.x) === this.position.x && Math.floor(pos.y) === this.position.y) {
      this.isMouseDown = true;
    }
  } 
  
  mouseUp() {
    this.isMouseDown && createEntityUpdate({ id: this.id, position: {x: Math.floor(getMousePositionCentreGrid().x), y: Math.floor(getMousePositionCentreGrid().y) }})
    super.updatePosition = true;
    this.isMouseDown = false;
  }

  update() {
    if (this.isMouseDown) {
      const newPosition = {
        x: getMousePositionCentreGrid().x - 0.5,
        y: getMousePositionCentreGrid().y - 0.5
      }
      createEntityUpdate({id: this.id, position: {x: newPosition.x, y: newPosition.y}})
    }
  }
}