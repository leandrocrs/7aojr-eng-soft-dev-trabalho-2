import 'dotenv/config.js';

import { authMiddleware } from 'auth-middleware';
import express from 'express';
import fs from "fs";
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import { readMessageToQueue } from './messaging/rabbitmqHelper.js';

import controller from './controller.js';

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;

const file = fs.readFileSync(path.join(import.meta.dirname, './openapi.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)

app.listen(port, () => {
  console.log(`Report and Progress service listening at ${host}:${port}`);
  console.log(`Swagger documentation available at ${host}:${port}/docs`);
});


await readMessageToQueue(
  'training-created',
  {
    host: "localhost",
    port: 5672,
    user: "admin",
    password: "password"
  }
)

app.use(express.json());
app.use(function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  res.on('finish', () => {
      console.log(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
  });
  next();
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', authMiddleware, controller);