import eventManager from "../engine/eventManager";
import GameObject from '../engine/gameObject'
import { uuidv4 } from "../utils";
import Token from "./token";
export default class TokenManager extends GameObject {
  
  constructor() {
    super();
  }

  addToken(pos) {
    new Token(uuidv4(), pos.x, pos.y, 'token.svg', 20);
  }
  start() {
    eventManager.registerEvent('place-token');
    eventManager.registerListener('place-token', (pos) => this.addToken(pos))
  }
}