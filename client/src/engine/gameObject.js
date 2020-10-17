import engine from "./engine"
import { uuidv4 } from "../utils";


export default class GameObject {
  constructor(id, x,y,sprite,size) {
    this.id = id || uuidv4()
    this.position = {x: x||0, y:y||0}
    this.sprite = sprite;
    this.size = size;
    this.updatePosition = true;
    engine.registerGameObject(this.id, this);
  }
  destroy() {
    engine.removeGameObject(this);
  }
  update() {

  }
  start() {
     
  }
  mouseDown() {
    return false;
  }
  mouseUp() {
    return false;
  }
}