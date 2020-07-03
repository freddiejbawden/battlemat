import EventManager from './../eventManager'
import { isBreakStatement } from 'typescript';

const down = {};

const keypressHandler = (e) => {
  // this is ugly
  down[e.which] = true
}

const keyupHandler = (e) => {
  delete down[e.which];
}

export const isKeyDown = (key) => {
  return (key in down);
}

export const startCapturingInput = () => {
  window.addEventListener('keydown', keypressHandler);
  window.addEventListener('keyup', keyupHandler);

}