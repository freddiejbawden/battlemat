import eventManager from '../engine/eventManager';
import Sprite from '../engine/sprite'
import { getMousePositionCentreGrid } from '../engine/input/input';
import {createEntityUpdate} from '../engine/statemanagement/state'
import Text from '../engine/text'
import { uuidv4 } from '../utils';
import { runInThisContext } from 'vm';
import { ThemeConsumer } from 'styled-components';

export default class Token extends Sprite {
  constructor(id, x, y, size, options={parent: null, text: 'T1'}) {
    super(id,x,y,'token.svg',size,options.parent || null);
    this.isMouseDown = false;
    this.options = options;
    this.mouseDownTime = 0
    this.textId = `${id}-text`
    super.addChild(new Text(`${id}-text`,0,0,options.text || null,id))
  }

  start() {
    console.log(`${this.id} start`)
  }

  checkCollision(pos) {
    const absolutePosition = this.getAbsolutePosition()
    return (Math.floor(pos.x) === absolutePosition.x && Math.floor(pos.y) === absolutePosition.y) 
  }

  mouseDown(pos) {
    const absolutePosition = this.getAbsolutePosition()
    if (Math.floor(pos.x) === absolutePosition.x && Math.floor(pos.y) === absolutePosition.y) {
      this.isMouseDown = true;
      this.mouseDownTime = Date.now()
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
    if (Date.now() - this.mouseDownTime <= 200) {
      eventManager.triggerEvent('show-details', this.id)
    }
  }

  update() {
    const t = this.getChild(this.textId)
    if (t) {
      t.text = this.options.text
    }
    if (this.isMouseDown && Date.now() - this.mouseDownTime > 200) {
      const newPosition = {
        x: getMousePositionCentreGrid().x - 0.5,
        y: getMousePositionCentreGrid().y - 0.5
      }
      const relativePosition = super.translatePointToRelative(newPosition);
      createEntityUpdate({id: this.id, position: {x: relativePosition.x, y: relativePosition.y}})
    }
  }
}