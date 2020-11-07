# battlemat

A small, very much work in progress, tabletop RPG (TTRPG) battlemat which aims to provide a streamlined experience for players who don't need the bulky features of other systems. 

Battlemats are used in TTRPGs during combat to visualise the position of the players and enemies, others solutions such as Roll20 aim to provide an all-in-one solution with many features creating a learning curve. The learning barrier often leaves players feeling overwhelmed, taking away from the enjoyment of the game. This project provides a simple alternative which reduces this barrier to play. 

The application uses a custom rendering engine based on a high level off of Unity. The rendering engine interfaces with React to provide the UI. Each client connects to a socket.io and express server written with Typescript to manage the battlemaps state and keep all clients in-sync.

## Running 

On first time running: `npm i` 

`npm run dev` starts the server on localhost:5000 and the client on localhost:3000. 

## Project Goals

- [x] Create a rendering engine to handle grid based play
- [] Users can use simple tokens with uploaded images to represent enemies and players
- [] Users can draw on the map to create terrain (old school dungeon map style) 
- [] Users can save and load battlemats
- [] Allow for users to create rooms to silo battlemaps into

