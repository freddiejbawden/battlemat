import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import io from 'socket.io';

const app = express();
const port = process.env.PORT || 8080;
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

app.get('/', (req, res) => {
  // tslint:disable-next-line:no-console
  console.log(req.sessionID);
  res.sendFile(__dirname + '/public/page.html');
})

const server = app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started on ${port}`)
})

const sio = io.listen(server);

sio.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

sio.sockets.on('connection', (socket) => {
  const hs = socket.request.session.id;
  // tslint:disable-next-line:no-console
  console.log(`A socket connected with id ${hs}`);
});

