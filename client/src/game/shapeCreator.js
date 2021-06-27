import Sprite from '../engine/sprite'
import eventManager from '../engine/eventManager'
import {getMousePositionIntersection} from '../engine/input/input'
import Polygon from '../engine/polygon';
import { addEntity } from '../engine/networking/networking';

class ShapeCreator extends Sprite {

  constructor() {
    super('shape-creator', 25.5,25.5,'pencil.svg',10,null,{shouldRender: false,anchorPosition: {x: 0.2, y: -0.2}, mouseGlobal: true});
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
    return (start && start.x === mousePos.x-1 && start.y === mousePos.y-1)
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