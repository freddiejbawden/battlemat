import {startCapturingInput, isKeyDown} from './input/input'
import EventManager from './eventManager'
import { render } from '../engine/rendering/renderer'
import { downloadAssets } from '../engine/assets/asset'
import { connectToServer } from '../engine/networking/networking'
class Engine {
  constructor() {
    this.gameObjects = [];
    startCapturingInput();
    
  }

  registerGameObject(go) {
    // type check?
    this.gameObjects.push(go);
  }

  removeGameObject(go) {
    delete this.gameObjects[this.gameObjects.indexOf(go)];
  }

  async start() {
    connectToServer();
    await downloadAssets();
    this.gameObjects.forEach(gameObject => {
      gameObject.update();
    })
    setInterval(() => {
      this.update();
      render();
    }, 1000/30);
  }
  update() {
   this.gameObjects.forEach(gameObject => {
     gameObject.update();
   })
  }
}

const instance = new Engine();
Object.freeze(instance);
export default instance;
