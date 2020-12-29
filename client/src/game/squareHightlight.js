import eventManager from "../engine/eventManager";
import Sprite from '../engine/sprite'
import { getMousePositionCentreGrid } from '../engine/input/input';

export default class SquareHighlight extends Sprite {
  constructor() {
    super('gridHighlight',25,25,'gridHighlight.svg',25,false);
    this.isMouseDown = false;
    this.show = false
    this.triggerShow = this.triggerShow.bind(this)
    eventManager.registerListener('add-token', () => this.triggerShow());
  }

  triggerShow() {
    this.show = true;
    super.shouldRender = true;
  }

  mouseDown() {
    if (this.show) {
      this.show = false;
      super.shouldRender = false;
      eventManager.triggerEvent('place-token', {
        x: Math.floor(getMousePositionCentreGrid().x), 
        y: Math.floor(getMousePositionCentreGrid().y)
      })
    }
  }

  update() {
    if (this.show) {
      this.position = {
        x:Math.floor(getMousePositionCentreGrid().x), 
        y:Math.floor(getMousePositionCentreGrid().y)
      }
    }
  }
  
}
