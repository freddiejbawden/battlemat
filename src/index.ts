import express from "express";
import cookieParser from 'cookie-parser';
import path from 'path';
import session from 'express-session';
import io from 'socket.io';

import Game, { Entity } from './game/game'


const app = express();
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname)
const verbose = false;
const sessionMiddleware = session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});
// configure app
if (app.get('env') === 'development') {
  app.use(cookieParser());
  app.use(sessionMiddleware);
}

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/tokens', (req,res) => {
  const list = ["assets/token.svg"];
  res.json(list);
});

app.get('/api/shapes', (req,res) => {
  const list = ["assets/polygon.svg","assets/drawline.svg"];
  res.json(list);
});

app.get('/', (req, res) => {
  // tslint:disable-next-line:no-console
  console.log(req.sessionID);
  res.sendFile(path.join(__dirname+'/client/index.html'));
})

const server = app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started on ${port}`)
})

const g = new Game()

const sio = io.listen(server);

sio.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

// move this
sio.sockets.on('connection', (socket) => {
  const hs = socket.request.session.id;
  // tslint:disable-next-line:no-console
  console.log(`A socket connected with id ${hs}`);
  socket.on('update-entity', (data: EntityUpdate) => {
    // tslint:disable-next-line:no-console
    const entityId = data.id
    delete data.id
    // tslint:disable-next-line:no-console
    g.updateEntity(data.sequenceNumber, entityId, data);
  })
  socket.on('add-entity', (entityId: string, entity: Entity) => {
    // tslint:disable-next-line:no-console
    g.addEntity(entityId, entity);
  })

  g.addPlayer(socket)
});

interface Position {
  x: number,
  y: number
}

interface EntityUpdate {
  id: string,
  position: Position,
  sequenceNumber: number,
}


setInterval(() => {
  g.update();
}, 1000 / 30)

