import 'dotenv/config'

import fs from "fs"
import express from "express"
import swaggerUi from 'swagger-ui-express'
import YAML from 'yaml'
import controller from './controller.js'

const app = express()

const file = fs.readFileSync('./openapi.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

const host = process.env.HOST
const port = process.env.PORT

app.listen(port, () => {
  console.log(`training-service running at ${host}:${port}`)
  console.log(`Swagger documentation available at ${host}:${port}/docs`)
})

app.use(express.json())
app.use(function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  res.on('finish', () => {
      console.log(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
  });
  next();
});
app.use('/', controller)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))