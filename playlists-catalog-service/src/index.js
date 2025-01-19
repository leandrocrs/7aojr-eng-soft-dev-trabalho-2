import 'dotenv/config.js';

import express from 'express';
import fs from "fs";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import path from 'path';

import controller from './controller.js';

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;

const file = fs.readFileSync(path.join(import.meta.dirname, './openapi.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)

app.listen(port, () => {
    console.log(`playlists-catalog-service listening at ${host}:${port} :)`);
    console.log(`Swagger documentation available at ${host}:${port}/docs :)`);
});

app.use(express.json());
app.use(function logger(req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
        console.log(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
    });
    next();
});
app.use('/playlists', controller);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));