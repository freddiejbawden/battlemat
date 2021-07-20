import eventManager from "../engine/eventManager";
import Sprite from '../engine/sprite'
import { getMousePositionCentreGrid } from '../engine/input/input';

export default class SquareHighlight extends Sprite {
  constructor() {
    super('gridhighlight',25,25,'gridhighlight.svg',25,null,{shouldRender: false});
    this.isMouseDown = false;
    this.show = false
    this.triggerShow = this.triggerShow.bind(this)
    eventManager.registerListener('add-token', () => this.triggerShow());
  }

  triggerShow() {
    this.show = true;
    super.shouldRender = true;
  }

  checkCollision(pos) {
    const absolutePosition = this.getAbsolutePosition()
    return (Math.floor(pos.x) === absolutePosition.x && Math.floor(pos.y) === absolutePosition.y) 
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
