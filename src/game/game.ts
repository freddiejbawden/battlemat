export interface Point2D {
  x: number,
  y: number
}

export interface NetworkedObject {
  name: string
  sequenceNumber: number
}

export interface Entity extends NetworkedObject {
  sprite: string,
  position: Point2D
  size: number,
  type: string,
}

export interface Shape extends NetworkedObject {
  points: Point2D[],
  type: string,
}

class Game {
  sockets: {[id: string] : SocketIO.Socket};
  // TODO: change this from any to a union type
  entities: {[id: string] : any}
  lastUpdateTime: number;
  constructor() {
    this.lastUpdateTime = Date.now();
    this.entities = {'tokenAD': {
      name: 'Token 1',
      type: 'token',
      options: {
        text: 'T2'
      },
      sprite: 'token.svg', // convert to static thing
      position: {x: 25, y:25},
      size: 20,
      sequenceNumber: 1
    },
    'polygon1': {
      name: 'Shape 1',
      type:'polygon',
      points: [{x: 25.5, y: 25.5},{x: 24.5, y: 25.5},{x: 24.5, y: 24.5},{x: 25.5,y: 24.5}],
    }
  }
}

  addPlayer(socket: SocketIO.Socket) {
    if (!this.sockets) {
      this.sockets = {}
    }
    this.sockets[socket.id] = socket;
  }

  addEntity(entityId: string, entity: any) {
    // tslint:disable-next-line: no-console
    console.log(entityId)
    // tslint:disable-next-line: no-console
    console.log(entity)
    this.entities[entityId] = entity;
  }

  updateEntity(sequenceNumber: number, entityID: string, updatedGameObject: any) {
    if (this.entities[entityID]) {
      this.entities[entityID].sequenceNumber = sequenceNumber
      Object.keys(updatedGameObject).forEach(property => {
        this.entities[entityID][property] = updatedGameObject[property]
      })
    }
  }


  // this can be improved by logging the player's camera position and zoom,
  createUpdate() {
    return {
      entities: this.entities
    }
  }
  update() {
    if (!this.sockets) {
      return;
    }
    Object.keys(this.sockets).forEach((playerId) => {
      const socket = this.sockets[playerId];
      socket.emit(
        'game-update', // make this a constant
        this.createUpdate()
      )
    })
  }
}

export default Game;