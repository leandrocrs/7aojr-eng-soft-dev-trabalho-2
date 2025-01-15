
import { Exercice } from './Exercice.js'

/**
 * @class Training
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {Exercice[]} exercicies
 */

export class Training {
    /** @type {string} */
    id

    /** @type {string} */
    name

    /** @type {string} */
    description

    /** @type {[Exercice]} */
    exercicies

    /**
     * @property {string} id
     * @property {string} name
     * @property {string} description
     * @property {[Exercice]} exercicies
     */
    constructor(id, name, description, exercicies) {
      this.id = id
      this.name = name
      this.description = description
      this.exercicies = exercicies
    }
}
