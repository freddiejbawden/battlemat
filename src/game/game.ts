export interface Entity {
  name: string,
  sprite: string,
  position: {x: number, y: number},
  size: number,
  type: string,
  sequenceNumber: number
}

class Game {
  sockets: {[id: string] : SocketIO.Socket};
  entities: {[id: string] : Entity};
  lastUpdateTime: number;
  constructor() {
    this.lastUpdateTime = Date.now();
    this.entities = {'tokenAD': {
      name: 'Token 1',
      type: 'token',
      sprite: 'token.svg', // convert to static thing
      position: {x: 25, y:25},
      size: 20,
      sequenceNumber: 1}
    }
  }

  addPlayer(socket: SocketIO.Socket) {
    if (!this.sockets) {
      this.sockets = {}
    }
    this.sockets[socket.id] = socket;
  }

  addEntity(entityId: string, entity: Entity) {
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