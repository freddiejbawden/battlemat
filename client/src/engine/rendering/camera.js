import EventManager from '../eventManager';

class Camera { 
  constructor() {
    this.data = {
      x: 0,
      y: 0,
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
    console.log(data.x, data.y)
    const {x,y} = data;
    this.data.x = x;
    this.data.y = y;
  }
  
}

const instance = new Camera();
Object.freeze(instance);
export default instance;