import eventManager from '../engine/eventManager';
import Sprite from '../engine/sprite'
import { getMousePositionCentreGrid } from '../engine/input/input';
import {createEntityUpdate} from '../engine/statemanagement/state'
import Text from '../engine/text'
import { uuidv4 } from '../utils';

export default class Token extends Sprite {
  constructor(id, x, y, size, options={parent: null, text: 'T1'}) {
    super(id,x,y,'token.svg',size,options.parent);
    this.isMouseDown = false;
    super.addChild(new Text(`${id}-text`,0,0,options.text,id))
    
  }

  start() {
    console.log(`${this.id} start`)
  }

  mouseDown(pos) {
    const absolutePosition = this.getAbsolutePosition()
    if (Math.floor(pos.x) === absolutePosition.x && Math.floor(pos.y) === absolutePosition.y) {
      this.isMouseDown = true;
    }
  } 
  
  mouseUp() {
    const newPosition = {
      x: getMousePositionCentreGrid().x,
      y: getMousePositionCentreGrid().y
    }
    const relativePosition = super.translatePointToRelative(newPosition);
    this.isMouseDown && createEntityUpdate({ id: this.id, position: {x: Math.floor(relativePosition.x), y: Math.floor(relativePosition.y) }})
    super.updatePosition = true;
    this.isMouseDown = false;
  }

  update() {
    if (this.isMouseDown) {
      const newPosition = {
        x: getMousePositionCentreGrid().x - 0.5,
        y: getMousePositionCentreGrid().y - 0.5
      }
      const relativePosition = super.translatePointToRelative(newPosition);
      createEntityUpdate({id: this.id, position: {x: relativePosition.x, y: relativePosition.y}})
    }
  }
}