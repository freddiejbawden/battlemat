import { getAsset } from '../assets/asset';
import camera from './camera'
import engine from '../engine'

export const GRID_SIZE = 100

const renderGrid = (ctx, canvas) => {
  const offset = {
    x: ((camera.data.x*GRID_SIZE/2 - GRID_SIZE/4) % GRID_SIZE),
    y: ((camera.data.y*GRID_SIZE/2 - GRID_SIZE/4) % GRID_SIZE) 
  }
  const gridImageSize = 500

  // place coregrid
  const drawGrid = (x,y) => {
    ctx.save();
    ctx.translate(-x + canvas.width / 2, -y + canvas.height / 2);
    ctx.drawImage(
      getAsset('grid.svg'),
      -gridImageSize/2,
      -gridImageSize/2,
      gridImageSize,
      gridImageSize,
    );
    ctx.restore();
  }
  
  const renderRow = (y) => {
     // how many do we need either side? 
     drawGrid(offset.x, y)
    if (gridImageSize < canvas.width) {
     const additionalGridCount = Math.ceil(canvas.width / gridImageSize);
     for (let i = 0; i < additionalGridCount; i+=1) {
       drawGrid(offset.x - (gridImageSize * (i + 1)), y)  
     }
     for (let i = 0; i < additionalGridCount; i+=1) {
       drawGrid(offset.x + (gridImageSize * (i + 1)), y)  
     }
    }
  }

  // span horizontally
  renderRow(offset.y)
  if (gridImageSize < canvas.height) {
    const additionalGridCount = Math.ceil(canvas.height / gridImageSize);
    for (let i = 0; i < additionalGridCount; i+=1) {
      renderRow(offset.y - (gridImageSize * (i + 1)))
    }
    for (let i = 0; i < additionalGridCount; i+=1) {
      renderRow(offset.y + (gridImageSize * (i + 1)))
    }
  }


}

const renderEntity = (entity,ctx, canvas) => {
  if (!entity.sprite) {
    return;
  }
  const relativePosition = {
    x: (entity.position.x - camera.data.x),
    y: (entity.position.y - camera.data.y)
  };
  // add a check here to see if it needs to be rendered
  ctx.save();
  ctx.translate(relativePosition.x*GRID_SIZE/2 + canvas.width / 2, relativePosition.y*GRID_SIZE/2 + canvas.height / 2);
  ctx.drawImage(
    getAsset(entity.sprite),
    -entity.size,
    -entity.size,
    entity.size * 2,
    entity.size * 2,
  );
  ctx.restore();
}

export const render = () => {
  const canvas = document.getElementById('grid-canvas');
  if (!canvas) return
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  // draw sample token
  renderGrid(ctx,canvas);
  Object.keys(engine.getGameObjects()).forEach(id => {
    const go = engine.getGameObject(id);
    if (go.shouldRender) {
      go.render(ctx,canvas);  
    }
  });
}
