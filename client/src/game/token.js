import GameObject from '../engine/gameObject'


export default class Token extends GameObject {
  constructor(id, x, y, sprite, size) {
    super(id,x,y,sprite,size);
  }

  click() {
    console.log(this.id + ' clicked')
  }
}