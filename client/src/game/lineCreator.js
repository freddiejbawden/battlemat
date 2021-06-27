import Sprite from '../engine/sprite'
import eventManager from '../engine/eventManager'
import {getMousePositionIntersection} from '../engine/input/input'
import Line from '../engine/line';
import { addEntity } from '../engine/networking/networking';

class LineCreator extends Sprite {

  constructor() {
    super(null, 25.5,25.5,'pencil.svg',10,null,{shouldRender: false, anchorPosition: {x: 0.2, y: -0.2}, mouseGlobal: true});
    this.points = []
    this.active = false;
    this.currentLine = null
  }

  start() {
    eventManager.registerEvent('cancel-action', {})
    eventManager.registerListener('cancel-action', () => {
      if (this.active) {
        this.active = false
        super.shouldRender = false
        this.currentLine.destroy()
      }
    })
    eventManager.registerEvent('activate-line-creator')
    eventManager.registerListener('activate-line-creator', () => {
      console.log('start')
      super.shouldRender = true
      this.active = true
      this.currentLine = new Line()
    })
  }
  
  checkLastAgain() {
    const mousePos = getMousePositionIntersection()
    const end = this.currentLine.points[this.currentLine.points.length - 1]
    return (end && end.x === mousePos.x-1 && end.y === mousePos.y-1)
  }

  mouseDown() {
    if (this.active) {
      if (!this.checkLastAgain()) {
        this.currentLine.addPoint(getMousePositionIntersection().x-1, getMousePositionIntersection().y-1) 
      } else {
        this.active = false
        super.shouldRender = false
        addEntity(this.id, {type: 'line', ...this.currentLine})
        this.currentLine = null
      }
    } 
  }

  update() {
      this.position = {
        x:Math.floor(getMousePositionIntersection().x) - 0.5, 
        y:Math.floor(getMousePositionIntersection().y) - 0.5
      }
  }

  


}

export default LineCreator