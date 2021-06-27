# battlemat

A small tabletop RPG (TTRPG) battlemat

The application uses a custom game engine based on a high level off of Unity. The rendering engine interfaces with React to provide the UI. Each client connects to a socket.io and express server written with Typescript to manage the battlemat's state and keep all clients in-sync.

## Running 

On first time running: `npm i` 

`npm run dev` starts the server on localhost:5000 and the client on localhost:3000. 

## Project Goals

- [x] Create a rendering engine to handle grid based play
- [x] Users can draw on the mat to create terrain (old school dungeon map style) 
- [x] Create a robust system for showing real-time updates to the battlemap
- [x] Allow renaming of tokens on map 

(I changed the scope of this project in an effor to get it done :) )
