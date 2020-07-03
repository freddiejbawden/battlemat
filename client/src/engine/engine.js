import {startCapturingInput, isKeyDown} from './input/input'
import EventManager from './eventManager'
import { render } from '../engine/rendering/renderer'
import { downloadAssets } from '../engine/assets/asset'
export class Engine {
  constructor() {
    startCapturingInput();
    
  }
  async start() {
    await downloadAssets();
    setInterval(() => {
      this.update();
      render();
    }, 1000/30);
  }
  update() {
    const movement = {x:0, y:0}
    // check keys for camera
    if (isKeyDown(65)) {
      movement.x += 1;
    }
    if (isKeyDown(68)) {
      movement.x += -1 
    }
    if (isKeyDown(87)) {
      movement.y += 1 
    }
    if (isKeyDown(83)) {
      movement.y += -1 
    }
    console.log(movement);
    EventManager.triggerEvent('camera-move', movement)
  }
}