import engine from "./engine"
import { uuidv4 } from "../utils";


export default class GameObject {
  constructor(id,x,y,shouldRender=true) {
    this.id = id || uuidv4()
    this.position = {x: x||0, y:y||0}
    this.shouldRender = shouldRender;
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
  render() {
    // console.warn('Base GameObject does not have a render method!')
  }
}