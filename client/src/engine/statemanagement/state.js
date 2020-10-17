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

export const processMapUpdate = (update) => {
  if (!firstServerTimestamp) {
    firstServerTimestamp = update.t;
    gameStart = Date.now();
  }   
  gameUpdates.push(update);

  const base = getBaseUpdate();
  if (base > 0) {
    gameUpdates.splice(0,base);
  }
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

export const getCurrentState = () => {
  if (!firstServerTimestamp) {
    return {};
  }

  const base = getBaseUpdate();
  const serverTime = currentServerTime();

  // if base is the most recnt update we hvae m use its state, else interploate between its state and the state of base + 1
  if (base < 0) {
    return gameUpdates[gameUpdates.length - 1];
  } else if (base === gameUpdates.length - 1) {
    // this is the latest we have
    return gameUpdates[base];
  } else {
    const baseUpdate = gameUpdates[base];
    const next = gameUpdates[base + 1];
    const r = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t);
    const entitiesBase = baseUpdate.entities;
    const entitiesNext = next.entities
    Object.keys(baseUpdate.entities).forEach((id) => {
      let gameObject = engine.getGameObject(id)
      const iterPosition = (r > 0) ? entitiesNext[id].position : entitiesBase[id].position
      if (!gameObject) {
        if (entitiesBase[id].type == 'token') {
          gameObject = new Token(id,iterPosition.x,iterPosition.y);
        } else {
          gameObject = new GameObject(id);
        }
      }

      if (gameObject.updatePosition) {
        gameObject.position = iterPosition
      }
      gameObject.size = entitiesBase[id].size
      gameObject.sprite = entitiesBase[id].sprite
    })
  }
};

const interpolatePosition = (pos1, pos2, ratio) => {
  return {
    x: pos1.x + (pos2.x - pos1.x)/ratio,
    y: pos1.y + (pos2.y - pos1.y)/ratio
  }
}