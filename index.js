// Use express webserver to run single page for clients to enter message
const express = require('express')
const webserver = express()
 .use((req, res) =>
   res.sendFile('/client.html', { root: __dirname })
 )
 .listen(3000, () => console.log(`Listening on ${3000}`));

 // inistantiate new websocket server on localhost port 443
const { WebSocketServer } = require('ws')
const socketServer = new WebSocketServer({ port: 443 }) 

socketServer.on('connection', ws => {
 console.log('New client connected!')
 ws.send('connection established')

 ws.on('close', () => console.log('Client has disconnected!'))

 //when the webserver receives the message from the client it will send back the data to the client
 ws.on('message', data => {
    socketServer.clients.forEach(client => {
     console.log(`distributing message: ${data}`)
     client.send(`${data}`)
   })
 })

 ws.onerror = function () {
   console.log('websocket error');
 }
})
