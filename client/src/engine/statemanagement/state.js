import engine from '../engine'
import GameObject from '../gameObject';
import Token from '../../game/token'
import {emitToServer} from '../networking/networking'

export const createEntityUpdate = (update) => {
  if (!update) {
    console.warn("An update to the server was empty")
    return
  }
  const {id,position,size} = update
  updateState([update]);
  emitToServer('update-entity', {id,position,size})
}

export const updateState = (entities) => {
  entities.forEach((entity) => {
    const id = entity.id
    let gameObject = engine.getGameObject(id)
    if (!gameObject) {
      if (entity.type == 'token') {
        gameObject = new Token(id, entity.position.x, entity.position.y);
      } else {
        gameObject = new GameObject(id);
      }
    }
    if (gameObject.updatePosition) {
      gameObject.position = entity.position
    }
    if (entity.size && gameObject.size !== entity.size) {
      gameObject.size = entity.size
    }
    if (entity.sprite && gameObject.sprite !== entity.sprite) {
      gameObject.sprite = entity.sprite
    }
  })
};