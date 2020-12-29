import GameObject from './gameObject'
import camera from './rendering/camera'
import {GRID_SIZE} from './rendering/renderer'
import { getAsset } from './assets/asset';
import eventManager from './eventManager';

class Sprite extends GameObject {
  constructor(id, x,y,sprite,size,shouldRender=true,anchorPosition=null) {
    super(id,x,y,shouldRender);
    this.size = size;
    this.sprite = sprite;
    this.updatePosition = true; 
    this.anchorPosition = anchorPosition || {x: 0, y: 0} 
    eventManager.registerListener('mousedowngrid', (pos) => this.mouseDown(pos))
    eventManager.registerListener('mouseupgrid', (pos) => this.mouseUp(pos))
  }

  render(ctx, canvas) {
    if (!this.sprite) {
      return;
    }
    
    const relativePosition = {
      x: (this.position.x - camera.data.x) + this.anchorPosition.x,
      y: (this.position.y - camera.data.y) + this.anchorPosition.y
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
    ctx.restore()
   }
}

export default Sprite;