const amqp = require('amqplib/callback_api');

const QUEUE_NAME = 'training-created';

amqp.connect('amqp://admin:password@localhost:5672', (error, connection) => {
  if (error) {
    throw error;
  }
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }

    channel.assertQueue(QUEUE_NAME, { durable: false });
    console.log(`Waiting for messages in ${QUEUE_NAME}. To exit press CTRL+C`);

    channel.consume(QUEUE_NAME, (msg) => {
      console.log("Received:", msg.content.toString());
    }, {
      noAck: true
    });
  });
});