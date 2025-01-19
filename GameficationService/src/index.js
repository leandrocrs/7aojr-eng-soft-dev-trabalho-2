import 'dotenv/config';

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
  console.log(`NotificationService listening at ${host}:${port}`);
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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', authMiddleware, controller);