import { getAsset } from '../assets/asset';
import { Vector } from '../math/vector'
import camera from './camera'




const renderEntity = (entity) => {
  const canvas = document.getElementById('grid-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const relativePosition = {
    x: (entity.position.x - camera.data.x),
    y: (entity.position.y - camera.data.y) 
  };
  // add a check here to see if it needs to be rendered
  ctx.save();
  ctx.translate(relativePosition.x + canvas.width / 2, relativePosition.y + canvas.height / 2);
  ctx.drawImage(
    getAsset('token.svg'),
    -50,
    -50,
    50 * 2,
    50 * 2,
  );
  ctx.restore();
}

export const render = () => {
  // const { camera, entities } = getCurrentState();
  // draw sample token
  let entities = [
    {
      position:{
        x: 0,
        y: 0
      }
    }
  ]
  entities.forEach(entity => {
    renderEntity(entity);  
  });
}
