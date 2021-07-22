import {startCapturingInput, isKeyDown} from './input/input'
import { render } from '../engine/rendering/renderer'
import { downloadAssets } from '../engine/assets/asset'
import { connectToServer } from '../engine/networking/networking'

class Engine {
  constructor() {
    this.gameObjects = {};
    this.gameObjectsAtPosition = {};
    startCapturingInput();
  }

  registerGameObject(id, go) {
    if (!this.gameObjects[id]) {
      this.gameObjects[id] =go;
    } else {
      console.error(`game object with ${id} already exists`)
      return
    }
    go.start()
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
    console.log('start')
    connectToServer();
    await downloadAssets();
    /* Object.keys(this.gameObjects).forEach(id => {
      this.getGameObject(id).start();
    }) */
    setInterval(() => {
      this.update();
      render();
    }, 1000/30);
  }
  update() {
    this.gameObjectsAtPosition = {}
    Object.keys(this.gameObjects).forEach(id => {
      this.getGameObject(id).update();
      const nextPos = this.getGameObject(id).position
      if (nextPos) {
        this.gameObjectsAtPosition[`${nextPos.x},${nextPos.y}`] = id
      }
    })
  }
}

const instance = new Engine();
export default instance;
