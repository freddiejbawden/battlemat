import Sprite from '../engine/sprite'
import eventManager from '../engine/eventManager'
import {getMousePositionIntersection} from '../engine/input/input'
import Polygon from '../engine/polygon';
import { addEntity } from '../engine/networking/networking';

class ShapeCreator extends Sprite {

  constructor() {
    super(null, 25.5,25.5,'token.svg',5,false);
    this.points = []
    this.active = false;
    this.currentPolygon = null
  }

  start() {
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
    console.log(start)
    return (start && start[0] === mousePos.x-1 && start[1] === mousePos.y-1)
  }

  mouseDown() {
    if (this.active) {
      if (!this.checkIfAtStart()) {
        console.log('down')
        this.currentPolygon.addPoint(getMousePositionIntersection().x-1, getMousePositionIntersection().y-1) 
      } else {
        console.log('at start')
        this.active = false
        super.shouldRender = false
        addEntity(this.id, {type: 'polygon', ...this.currentPolygon})
        this.currentPolygon = null
      }
    }
    
  }

  segment(pos) {
    console.log(`select-point ${pos.x} ${pos.y}`)
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