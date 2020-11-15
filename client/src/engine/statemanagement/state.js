import engine from '../engine'
import GameObject from '../gameObject';
import Token from '../../game/token'

const RENDER_DELAY = 100; // 100 ms between the clients and server time

const gameUpdates = [];
let gameStart = 0;
let firstServerTimestamp = 0;

export const initState = () => {
   gameStart = 0;
   firstServerTimestamp = 0;
}

export const handleIncomingMessage = (update) => {
  updateState(update)
}

const currentServerTime = () => {
  return firstServerTimestamp + (Date.now() - gameStart) - RENDER_DELAY;
}
// Return the first update before the current server time
const getBaseUpdate = () => {
  const serverTime = currentServerTime();
  for (let i = gameUpdates.length - 1; i >= 0; i--) {
    if (gameUpdates[i].t <= serverTime) {
      return i;
    }
  }
  return -1;
}

const updateState = (update) => {
  const next = update
  const entitiesNext = next.entities
  Object.keys(entitiesNext).forEach((id) => {
    let gameObject = engine.getGameObject(id)
    const iterPosition = entitiesNext[id].position
    if (!gameObject) {
      if (entitiesNext[id].type == 'token') {
        gameObject = new Token(id,iterPosition.x,iterPosition.y);
      } else {
        gameObject = new GameObject(id);
      }
    }
    if (gameObject.updatePosition) {
      gameObject.position = iterPosition
    }
    gameObject.size = entitiesNext[id].size
    gameObject.sprite = entitiesNext[id].sprite
  })
};