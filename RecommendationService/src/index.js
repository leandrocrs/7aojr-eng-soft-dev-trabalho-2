import 'dotenv/config';

import { readMessageToQueue } from './messaging/rabbitmqHelper.js'

await readMessageToQueue(
  'training-created',
  {
    host: process.env.RABBIT_HOST,
    port: process.env.RABBIT_PORT,
    user: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASSWORD
  }
)
