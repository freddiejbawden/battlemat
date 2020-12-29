import GameObject from './gameObject'
import camera from './rendering/camera'
import {GRID_SIZE} from './rendering/renderer'

// TODO: change polygon to use x,y instead of array
class Line extends GameObject {
  constructor(id,points,shouldRender) {
    super(id,0,0,shouldRender)
    this.points = points || []
  } 

  render(ctx, canvas) {
    if (this.points.length <= 1) {
      return false
    }
    const relativePosition = {
      x: (this.points[0][0] - camera.data.x),
      y: (this.points[0][1] - camera.data.y)
    };

    ctx.beginPath()
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#00FF00";
    ctx.moveTo(relativePosition.x*GRID_SIZE/2 + canvas.width / 2, relativePosition.y*GRID_SIZE/2 + canvas.height / 2)
    for (let i = 1; i < this.points.length; i++){
      const relativePosition2 = {
        x: (this.points[i][0] - camera.data.x),
        y: (this.points[i][1] - camera.data.y)
      };
      ctx.lineTo(relativePosition2.x*GRID_SIZE/2 + canvas.width / 2, relativePosition2.y*GRID_SIZE/2 + canvas.height / 2)
    }
    ctx.stroke();
  }

  addPoint(x,y) {
    this.points.push([x,y])
  }

  removePoint(x,y) {
    this.points = this.points.filter(point => point.x !== x && point.y !== y)
  }

}

export default Line