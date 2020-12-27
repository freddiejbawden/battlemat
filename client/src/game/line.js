import eventManager from '../engine/eventManager';
import GameObject from '../engine/gameObject'

export default class Line extends GameObject {
  constructor(id, x, y, sprite, size, points) {
    super(id,x,y,sprite,size);
    this.isMouseDown = false;
    this.points = points
  }


  render(ctx,canvas) {
    this.points.forEach(point => {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    })
  }
}