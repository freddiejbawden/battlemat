import express from "express";
import cookieParser from 'cookie-parser';
import path from 'path';
import session, {SessionData} from 'express-session';
import { Server, Socket } from 'socket.io';
import Game, { Entity } from './game/game'
import { IncomingMessage } from "http";

declare module 'express-session' {
  interface SessionData {
    session: string
  }
}

interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData,
}

interface SessionSocket extends Socket {
  request: SessionIncomingMessage
}

const app = express();
const port = process.env.PORT || 8080;

const sessionMiddleware = session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

const wrapper = (middleware: any) => (socket: Socket, next: any) => middleware(socket.request, {}, next);

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

const io = new Server(server);

io.use(wrapper(sessionMiddleware))

// move this
io.on('connection', (socket: SessionSocket) => {
  const s = socket.request.session;
  // tslint:disable-next-line:no-console
  console.log(s);
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

