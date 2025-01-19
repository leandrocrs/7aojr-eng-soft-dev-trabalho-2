import 'dotenv/config';

import { readMessageToQueue } from './messaging/rabbitmqHelper.js'

await readMessageToQueue(
  'training-created',
  {
    host: "localhost",
    port: 5672,
    user: "admin",
    password: "password"
  }
)
