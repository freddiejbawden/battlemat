import GameObject from '../engine/gameObject'
import eventManager from '../engine/eventManager'

const LINE_STATE = {
  INACTIVE: 0,
  WAIT_FOR_FIRST: 1,
  PLACING_SECOND: 2,
}


class ShapeCreator extends GameObject {

  constructor() {
    super();
    this.points = []
  }

  start() {
    eventManager.registerListener('select-point', (pos) => this.segment(pos));
  }

  segment(pos) {
    console.log(`select-point ${pos.x} ${pos.y}`)
    if (this.linestart) {
      this.lineend = pos
    } else {
      this.linestart = pos
    }
  }

  


}

export default ShapeCreator