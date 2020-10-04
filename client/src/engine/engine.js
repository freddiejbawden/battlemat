import {startCapturingInput, isKeyDown} from './input/input'
import EventManager from './eventManager'
import { render } from '../engine/rendering/renderer'
import { downloadAssets } from '../engine/assets/asset'
import { connectToServer } from '../engine/networking/networking'
class Engine {
  constructor() {
    this.gameObjects = {};
    startCapturingInput();
  }

  registerGameObject(id, go) {
    if (!this.gameObjects[id]) {
      this.gameObjects[id] =go;
    } else {
      console.log(`game object with ${id} already exists`)
    }
  }

  removeGameObject(id) {
    delete this.gameObjects[id];
  }

  getGameObject(id) {
    return this.gameObjects[id]
  }

  getGameObjects() {
    return this.gameObjects
  }

  async start() {
    connectToServer();
    await downloadAssets();
    Object.keys(this.gameObjects).forEach(id => {
      this.getGameObject(id).update();
    })
    setInterval(() => {
      this.update();
      render();
    }, 1000/30);
  }
  update() {
   Object.keys(this.gameObjects).forEach(id => {
     this.getGameObject(id).update();
   })
  }
}

const instance = new Engine();
Object.freeze(instance);
export default instance;
