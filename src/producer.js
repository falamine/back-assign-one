const { kafka } = require("../utils/kafka"); //import kafka configs 
const WebSocket = require('ws');

const producer = kafka.producer(); // Create kafka producer
const kafka_topic = "message_topic_ws"; //kafka topic is used to send message to producer and when consuming we use the same topic name
const ws = new WebSocket('ws://localhost:443/') ;

ws.on('open', function() {
  console.log('connected to ws');
})

//When message is received from websocket server , then send it to kafka using producer and topic
ws.on('message', async function sendMessage(message) {
  var buf = Buffer.from(message);
  var msg = buf.toString(); // convert the buffered message to string.
  console.log('received message from server' , msg);
  const kafkaMessage = {value: msg};
  await sendMessageToKafka(kafkaMessage);
})

const sendMessageToKafka = async (message) => {
  try {
    await producer.connect()
    await producer.send({
    topic: kafka_topic,
    messages: [
      { value: JSON.stringify(message) },
    ],
  })
  }catch(error) {
    console.log('Could not send message to kafka', error);
  }
 
}