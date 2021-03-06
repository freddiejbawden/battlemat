import engine from '../engine'
import GameObject from '../gameObject';
import Token from '../../game/token'
import Polygon from '../polygon'
import Line from '../line'
import {emitToServer} from '../networking/networking'

export const createEntityUpdate = (update) => {
  if (!update) {
    console.warn("An update to the server was empty")
    return
  }
  const {id,position,size} = update
  updateState([update]);
  emitToServer('update-entity', update)
}

export const updateState = (entities) => {
  entities.forEach((entity) => {
    const id = entity.id
    let gameObject = engine.getGameObject(id)
    if (!gameObject) {
      if (entity.type == 'token') {
        gameObject = new Token(id, entity.position.x, entity.position.y, 25, entity.options);
      } else if (entity.type === 'polygon'){
        gameObject = new Polygon(id, entity.points)
      } else if (entity.type === 'line') {
        gameObject = new Line(id, entity.points)
      } else {
        console.warn(`Unhandled type ${entity.type}`)
        gameObject = new GameObject(id);
      }
    }
    if (gameObject.updatePosition) {
      gameObject.position = entity.position
    }
  
    Object.keys(entity).forEach(property => {
      if (entity[property] && gameObject[property] !== entity[property]) {
        gameObject[property] = entity[property]
      }
    })
  })
};