import Sprite from '../engine/sprite'
import eventManager from '../engine/eventManager'
import {getMousePositionIntersection} from '../engine/input/input'
import Polygon from '../engine/polygon';
import { addEntity } from '../engine/networking/networking';

class ShapeCreator extends Sprite {

  constructor() {
    super(null, 25.5,25.5,'pencil.svg',10,false,{x: 0.2, y: -0.2});
    this.points = []
    this.active = false;
    this.currentPolygon = null
  }

  start() {
    eventManager.registerEvent('cancel-action', {})
    eventManager.registerListener('cancel-action', () => {
      if (this.active) {
        this.active = false
        super.shouldRender = false
        this.currentPolygon.destroy()
      }
    })

    eventManager.registerEvent('activate-shape-creator')
    eventManager.registerListener('activate-shape-creator', () => {
      super.shouldRender = true
      this.active = true
      this.currentPolygon = new Polygon()
    })
  }
  

  checkIfAtStart() {
    const mousePos = getMousePositionIntersection()
    const start = this.currentPolygon.points[0]
    return (start && start[0] === mousePos.x-1 && start[1] === mousePos.y-1)
  }

  mouseDown() {
    if (this.active) {
      if (!this.checkIfAtStart()) {
        this.currentPolygon.addPoint(getMousePositionIntersection().x-1, getMousePositionIntersection().y-1) 
      } else {
        this.active = false
        super.shouldRender = false
        addEntity(this.id, {type: 'polygon', ...this.currentPolygon})
        this.currentPolygon = null
      }
    }
    
  }

  segment(pos) {
    if (this.linestart) {
      this.lineend = pos
    } else {
      this.linestart = pos
    }
  }

  update() {
      this.position = {
        x:Math.floor(getMousePositionIntersection().x) - 0.5, 
        y:Math.floor(getMousePositionIntersection().y) - 0.5
      }
  }

  


}

export default ShapeCreator