import EventManager from '../eventManager';

class Camera { 
  constructor() {
    this.data = {
      x: 25,
      y: 25,
      zoom: 1,
    }    
  }
  get x() {
    return this.data.x;
  }
  get y() {
    return this.data.y;
  }
  updatePosition(data) {
    const {x,y} = data;
    this.data.x = x;
    this.data.y = y;
  }
  
}

const instance = new Camera();
Object.freeze(instance);
export default instance;