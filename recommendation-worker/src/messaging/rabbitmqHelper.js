import amqp from 'amqplib';

/**
 * Sends a message to a RabbitMQ queue.
 *
 * @param {string} queue - The name of the queue.
 * @param {string | object} message - The message to send. Objects will be stringified.
 * @param {object} options - RabbitMQ connection options.
 * @param {string} options.host - RabbitMQ host (default: "localhost").
 * @param {number} options.port - RabbitMQ port (default: 5672).
 * @param {string} options.user - RabbitMQ username.
 * @param {string} options.password - RabbitMQ password.
 */
export async function sendMessageToQueue(queue, message, options) {

  const connectionString = `amqp://${options.user}:${options.password}@${options.host}:${options.port}`;

  let connection;
  let channel;

  try {
    // Establish connection to RabbitMQ
    connection = await amqp.connect(connectionString);
    channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue(queue, { durable: false });

    // Send the message
    const messageString = typeof message === 'object' ? JSON.stringify(message) : message;
    channel.sendToQueue(queue, Buffer.from(messageString), { persistent: true });

    console.log(`Message sent to queue "${queue}":`, messageString);
  } catch (error) {
    console.error('Error sending message to RabbitMQ:', error);
  } finally {
    // Clean up resources
    if (channel) await channel.close();
    if (connection) await connection.close();
  }
}

/**
 * Sends a message to a RabbitMQ queue.
 *
 * @param {string} queue - The name of the queue.
 * @param {string | object} message - The message to send. Objects will be stringified.
 * @param {object} options - RabbitMQ connection options.
 * @param {string} options.host - RabbitMQ host (default: "localhost").
 * @param {number} options.port - RabbitMQ port (default: 5672).
 * @param {string} options.user - RabbitMQ username.
 * @param {string} options.password - RabbitMQ password.
 */
export async function readMessageToQueue(queue, options) {

  const connectionString = `amqp://${options.user}:${options.password}@${options.host}:${options.port}`;

  let connection;
  let channel;

  try {
    // Establish connection to RabbitMQ
    connection = await amqp.connect(connectionString);
    channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue(queue, { durable: false });

    channel.consume(queue, (msg) => {
      if (msg) {
        console.log("Received:", msg.content.toString());
        channel.ack(msg)
      }
    }, { noAck: false })
  } catch (error) {
    console.error('Error sending message to RabbitMQ:', error);
  }
}