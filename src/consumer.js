const { kafka } = require("../utils/kafka");

const consumer = kafka.consumer({groupId: "group-one"})

const init = async() => {
  await consumer.connect();
  await consumer.subscribe({ topic: "message_from_ws", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `${topic}`,
        message.value.toString()
      );
    },
  });
}

init();