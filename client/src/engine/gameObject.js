import engine from "./engine"

export default class GameObject {
  constructor() {
    engine.registerGameObject(this);
  }
  destroy() {
    engine.removeGameObject(this);
  }
  update() {

  }
  start() {
    
  }
}