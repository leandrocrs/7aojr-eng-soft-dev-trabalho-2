import { v4 as uuid } from 'uuid'

import { Training } from './model/Training.js'

export class TrainingRepository {
    constructor() {
        /** @type {trainings[]} */
        this.trainings = []
    }

    /** @param {string} id */
    async getById(id) {
      return this.trainings.find(training => training.id === id)
    }

    async deleteById(id) {
      const training = await this.getById(id)
      const index = this.trainings.indexOf(training)
      if (index >= 0) {
        return this.trainings.splice(index, 1)
      } else {
        throw new Error(`There is no training with this id! ${id}`);
      }
  }

    async getAll() {
      return this.trainings
    }
    
    /** 
     * @param {string} id 
     * @param {[String: Any]} param
    */
    async updateById(id, param) {
      const training = await this.getById(id)
      const index = this.trainings.indexOf(training)

      const name = param.name
      const description = param.description
      const exercicies = param.exercicies

      var updatedObj = new Training(
        training.id, 
        name == null ? training.name : name,
        description == null ? training.description : description,
        exercicies == null ? training.exercicies : exercicies
      )
      
      this.trainings[index] = updatedObj
      return updatedObj
    }

    /**
     * @param {Object} params
     * @param {string} params.name
     * @param {string} params.description
     * @param {string} params.exercicies
     */
    async create(params) {
        const newTraining = new Training(uuid(), params.name, params.description, params.exercicies)
        this.trainings.push(newTraining)
        return newTraining
    }

}