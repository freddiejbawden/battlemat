import GameObject from './gameObject'
import camera from './rendering/camera'
import {GRID_SIZE} from './rendering/renderer'
import { getAsset } from './assets/asset';
import eventManager from './eventManager';

class Sprite extends GameObject {
  constructor(id, x,y,sprite,size,parent,options={shouldRender: true,anchorPosition: null, mouseGlobal: false}) {
    super(id,x,y,parent,{ shouldRender: options.shouldRender });
    this.size = size;
    this.sprite = sprite;
    this.updatePosition = true; 
    this.anchorPosition = options.anchorPosition || {x: 0, y: 0} 
    if (options.mouseGlobal) {
      eventManager.registerListener('mousedowngrid', (pos) => this.mouseDown())
    }
    eventManager.registerListener('mouseupgrid', (pos) => this.mouseUp(pos))
  }
  
  checkCollision(position) {
    return false
  }
  
  render(ctx, canvas) {
    if (!this.sprite) {
      return;
    }
    const absolutePosition = super.getAbsolutePosition()
    const relativePosition = {
      x: (absolutePosition.x - camera.data.x) + this.anchorPosition.x,
      y: (absolutePosition.y - camera.data.y) + this.anchorPosition.y
    };
    // add a check here to see if it needs to be rendered
    ctx.save();
    ctx.translate(relativePosition.x*GRID_SIZE/2 + canvas.width / 2, relativePosition.y*GRID_SIZE/2 + canvas.height / 2);
    ctx.drawImage(
      getAsset(this.sprite),
      -this.size,
      -this.size,
      this.size * 2,
      this.size * 2,
    );
    ctx.restore();
    super.renderChildren(ctx,canvas)
   }
}

export default Sprite;