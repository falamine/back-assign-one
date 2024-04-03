const { kafka } = require("../utils/kafka"); //import kafka configs 
const WebSocket = require('ws');

const producer = kafka.producer(); // Create kafka producer
const kafka_topic = "message_from_ws"; //kafka topic is used to send message to producer and when consuming we use the same topic name
const ws = new WebSocket('ws://localhost:443/') ;

//connect to kafka producer
async function init() {
  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");
}
init();

ws.on('open', function() {
  console.log('connected to ws');
})

//When message is received from websocket server , then send it to kafka using producer and topic
ws.on('message', function sendMessage(event) {
  console.log('received message from server' , event.data);
  sendMessageToKafka(event.data);
})

async function sendMessageToKafka(message) {
  try {
    await producer.send({
      topic: kafka_topic,
      messages: [{value: message}]
    })
  } catch (error) {
    console.log('Could not send message to kafka', error);
  }
}