import eventManager from "../engine/eventManager";
import GameObject from '../engine/gameObject'
import { addEntity } from "../engine/networking/networking";
import { uuidv4 } from "../utils";

export default class TokenManager extends GameObject {
  
  constructor() {
    super();
  }

  addToken(pos) {
    console.log('add token')
    const id = uuidv4();
    addEntity(id, {
      name: id, 
      position: pos,
      type: 'token',
      sprite: 'token.svg', 
      size: 20
    });
  }
  
  start() {
    eventManager.registerEvent('place-token');
    eventManager.registerListener('place-token', (pos) => this.addToken(pos))
  }
}