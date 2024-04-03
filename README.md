# back-assign-one
Follow the following steps to run and test the project
- run 'docker compose up' while you are on the root directory.
- run 'node index.js' from terminal while you are on the root directory.
- cd src and run 'node producer.js'
- cd src and run 'node consumer.js'

Navigate to http://localhost:3000
You will see default message from the server.
Enter value to the message input and click send.
Check your terminals where you have run kafka consumer and producer.(You should be able to see the messages you entered.)

![Alt text](utils/images/Producer.PNG?raw=true "producer")
![Alt text](utils/images/consumer.PNG?raw=true "consumer")