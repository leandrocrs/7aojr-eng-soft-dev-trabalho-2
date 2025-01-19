import express from 'express'
import 'dotenv/config'

import { TrainingRepository } from './TrainingRepository.js'
import sendMessageToQueue from './messaging/RabbitmqHelper.cjs'

const router = express.Router()
const repository = new TrainingRepository()

router.get('/trainings', async (req, res) => {
  try {
    const trainings = await repository.getAll()
    res.status(200).json(trainings)
  } catch(error) {
    return res.status(500).send({ message: error.message })
  }
})


/** @param {string} id */
router.get('/trainings/:id', async (req, res) => {
  try {
    const id = req.params.id
    const training = await repository.getById(id)
    res.status(200).json(training)
  } catch(error) {
    return res.status(500).send({ message: error.message })
  }
}) 

/** @param {string} id */
router.put('/trainings/:id', async (req, res) => {
  try {
    const updatedTraining = await repository.updateById(req.params.id, req.body)
    res.status(200).json(updatedTraining)
  } catch(error) {
    return res.status(500).send({ message: error.message })
  }
})

router.post('/trainings', async (req, res) => {
  try {
    const newTraining = await repository.create(req.body)
    res.status(201).json(newTraining)
    
    sendMessageToQueue('training-created', newTraining, {
      host: "localhost",
      port: 5672,
      user: "admin",
      password: "password"
    })
    
  } catch(error) {
    return res.status(500).send({ message: error.message })
  }
})

/** @param {string} id */
router.delete('/trainings/:id', async (req, res) => {
  try {
    const deletedTraining = await repository.deleteById(req.params.id)
    res.status(200).json(deletedTraining)
  } catch(error) {
    return res.status(500).send({ message: error.message })
  }
})

export default router