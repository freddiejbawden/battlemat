import EventManager from '../eventManager';

class Camera { 
  constructor() {
    this.data = {
      x: 0,
      y: 0,
      zoom: 1,
      speed: 5
    }
    EventManager.registerListener('camera-move', (data) => {
      const {x,y} = data;
      this.data.x += x * this.data.speed;
      this.data.y += y * this.data.speed;
    });  
  }
  
}

const instance = new Camera();
Object.freeze(instance);
export default instance;