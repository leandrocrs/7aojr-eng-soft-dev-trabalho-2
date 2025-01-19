import 'dotenv/config.js';

import { sendMessageToQueue, readMessageToQueue } from './messaging/rabbitmqHelper.cjs'

console.log('recommendation-worker is running....')

async function handleMessage(message) {
  const queue = 'recommendation-created'
  const options = {
      host: process.env.RABBIT_HOST,
      port: process.env.RABBIT_PORT,
      user: process.env.RABBIT_USER,
      password: process.env.RABBIT_PASSWORD
  }
  await sendMessageToQueue(queue, message, options)
}

(async () => { 
  console.log(`listeting to queue training-created`)
  const queue = 'training-created'
  const options = {
      host: process.env.RABBIT_HOST,
      port: process.env.RABBIT_PORT,
      user: process.env.RABBIT_USER,
      password: process.env.RABBIT_PASSWORD
  }

  await readMessageToQueue(queue, handleMessage, options)
})()