import 'dotenv/config';

import express from 'express';
import fs from "fs";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import controller from './controller.js';

import { initDbConnection } from './db/db.js';

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;

const file = fs.readFileSync('./openapi.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

initDbConnection().then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

app.listen(port, () => {
    console.log(`user-management-service listening at ${host}:${port}`);
    console.log(`Swagger documentation available at ${host}:${port}/docs`);
});

app.use(function logger(req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
        console.log(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
    });
    next();
});
app.use(express.json());
app.use('/', controller);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));