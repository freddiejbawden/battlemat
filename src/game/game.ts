interface Entity {
  name: string,
  sprite: string,
  position: {x: number, y: number},
  size: number
}

class Game {
  sockets: {[id: string] : SocketIO.Socket};
  entities: {[id: string] : Entity};
  lastUpdateTime: number;
  constructor() {
    this.lastUpdateTime = Date.now();
    this.entities = {'tokenAD': {
      name: 'Token 1',
      sprite: 'token.svg', // convert to static thing
      position: {x: 25, y:25},
      size: 20}
    }
  }

  addPlayer(socket: SocketIO.Socket) {
    if (!this.sockets) {
      this.sockets = {}
    }
    this.sockets[socket.id] = socket;
  }

  updateEntity(entityID: string, newX: number, newY:number) {
    if (this.entities[entityID]) {
      this.entities[entityID].position = {x: newX, y: newY}
    }
  }


  // this can be improved by logging the player's camera position and zoom,
  createUpdate() {
    return {
      t: Date.now(),
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