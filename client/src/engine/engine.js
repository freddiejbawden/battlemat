import {startCapturingInput} from './input/input'
import { render } from '../engine/rendering/renderer'
export class Engine {
  constructor() {
    startCapturingInput();
    setInterval(() => {
      render();
    }, 1000/30);
  }
}