const WebSocket = require('websocket'); // import websocket library
const clientWebSocket = new WebSocket(); // instantiate new websocket object
clientWebSocket.connect('ws://localhost:443/'); // connect client websocket with the server websocket via url;

clientWebSocket.on('connect' , 
function() {
    console.log('Client Connected.')
})

clientWebSocket.on('error' , 
function(error) {
    console.log('connection error ' + error.toString())
})


clientWebSocket.on('message' , 
function(event) {
    console.log(event)
    document.getElementById('messages').innerHTML += 'Message from server: ' + event.data + "<br>";
})
         
 function sendMessage(event) {
    var inputMessage = document.getElementById('message')
    clientWebSocket.send(inputMessage.value)
    inputMessage.value = ""
    event.preventDefault();
}       
document.getElementById('input-form').addEventListener('submit', sendMessage);