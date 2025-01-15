import 'dotenv/config'
import express from "express"

import controller from './Controller.js'

const app = express()

const host = process.env.HOST
const port = process.env.PORT

app.listen(port, () => {
  console.log(`TainingService running at ${host}:${port}`) 
})

app.use(express.json())
app.use('/', controller)