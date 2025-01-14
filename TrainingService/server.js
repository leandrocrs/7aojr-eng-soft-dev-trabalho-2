import express from "express"
import { v4 as uuidv4 } from 'uuid'

// APP Configuration
const app = express()
app.use(express.json())

// Model
function Exercice(name, description, sets) {
  
}

function Training(id, name, description, exercices) {
  var training = {}
  training.id = id
  training.name = name
  training.description = description
  training.exercices = exercices
  return training
}

// local db
var trainings = []

app.get('/', (req, res) => {
  console.log("reached route /")
  res.send('Hello Pulse App Playlists')
}) 

app.get('/trainings', (req, res) => {
  res.status(200).json(trainings)
}) 

app.get('/trainings/:id', (req, res) => {
  const id = req.params.id
  const training = trainings.find(x => x.id == id)
  res.status(200).json(training)
}) 


app.put('/trainings/:id', (req, res) => {
  const id = req.params.id

  const training = trainings.find(x => x.id == id)

  const index = trainings.indexOf(training)
 

  const name = req.body.name
  const description = req.body.description
  const exercices = req.body.exercices

  const ntraining = new Training(id, name, description, exercices)
  trainings[index] = ntraining
  res.status(200).json(ntraining)
})

app.post('/trainings', (req, res) => {
  const id = uuidv4()
  const name = req.body.name
  const description = req.body.description
  const exercices = req.body.exercices

  const training = new Training(id, name, description, exercices)
  trainings.push(training)
  res.status(201).json(training)
})

app.listen(3000)