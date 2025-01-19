const amqp = require('amqplib/callback_api');

const QUEUE_NAME = 'my_queue';

amqp.connect('amqp://admin:password@localhost:5672', (error, connection) => {
  if (error) {
    console.log(error)
  }
  connection.createChannel((error, channel) => {
    if (error) {
      console.log(error) 
    }

    channel.assertQueue(QUEUE_NAME, { durable: false });

    const message = 'Hello, RabbitMQ!';
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
    console.log("Sent:", message);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  });
});