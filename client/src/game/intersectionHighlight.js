import eventManager from "../engine/eventManager";
import GameObject from '../engine/gameObject'
import { getMousePositionIntersection } from '../engine/input/input';

const DRAWING_STATE = {

}

export default class IntersectionHighlight extends GameObject {
  constructor() {
    super('intersectionHightlight',25,25,'token.svg',5,false);
    this.isMouseDown = false;
    this.show = false
    this.triggerShow = this.triggerShow.bind(this)
    eventManager.registerEvent('line-start')
    eventManager.registerEvent('end-shape')
    eventManager.registerListener('end-shape', () => this.show = false)

    eventManager.registerListener('start-draw', () => this.triggerShow());
    eventManager.registerListener('mousedowngrid', (pos) => this.mouseDown(pos))
    eventManager.registerListener('mouseupgrid', (pos) => this.mouseUp(pos))
  }

  triggerShow() {
    this.show = true;
    super.shouldRender = true;
  }

  mouseDown() {
    eventManager.triggerEvent('select-point', this.position);
  }

  update() {
    if (this.show) {
      this.position = {
        x:Math.floor(getMousePositionIntersection().x) - 0.5, 
        y:Math.floor(getMousePositionIntersection().y) - 0.5
      }
    }
  }
  
}
