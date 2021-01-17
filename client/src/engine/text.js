import GameObject from './gameObject'
import camera from './rendering/camera'
import {GRID_SIZE} from './rendering/renderer'

class Text extends GameObject {
  constructor(id, x, y, text, parent, size=25) {
    super(id,x,y,parent);
    this.text = text
    this.size = 50;
  }
  
  render(ctx, canvas) {
    const absolutePosition = super.getAbsolutePosition();
    const relativePosition = {
      x: (absolutePosition.x - camera.data.x), 
      y: (absolutePosition.y - camera.data.y) 
    }
    ctx.font = '20px serif';
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      this.text, 
      relativePosition.x*GRID_SIZE/2 + canvas.width / 2, 
      relativePosition.y*GRID_SIZE/2 + canvas.height / 2, 
      this.size*2
    );
    ctx.restore()
  }
}

export default Text