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
  position: number[],
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
      sprite: 'token.svg', // convert to static thing
      position: {x: 25, y:25},
      size: 20,
      sequenceNumber: 1
    },
    'polygon1': {
      name: 'Shape 1',
      type:'polygon',
      points: [[25.5,25.5],[24.5,25.5],[24.5,24.5],[25.5,24.5]],
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

  updateEntity(sequenceNumber: number, entityID: string, newX: number, newY:number) {
    if (this.entities[entityID]) {
      this.entities[entityID].sequenceNumber = sequenceNumber
      this.entities[entityID].position = {x: newX, y: newY}
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