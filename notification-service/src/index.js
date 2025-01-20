import 'dotenv/config';

import express from 'express';
import fs from "fs";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import path from 'path';
import { readMessageToQueue } from './messaging/rabbitmqHelper.cjs'

import controller from './controller.js';

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;

const file = fs.readFileSync(path.join(import.meta.dirname, './openapi.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)

app.listen(port, () => {
  console.log(`notification-service listening at ${host}:${port}`);
  console.log(`Swagger documentation available at ${host}:${port}/docs`);
});

function handleMessage(message) {
    console.log(`Received message on callback: ${message}`)
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

app.use(express.json());
app.use(function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  res.on('finish', () => {
    console.log(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
  });
  next();
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', controller);