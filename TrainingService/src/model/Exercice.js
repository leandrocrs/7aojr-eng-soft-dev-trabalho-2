/**
 * @class Exercice
 * @property {string} id
 * @property {string} name
 * @property {string} descrioption
 * @property {int[]} sets
 */

export class Exercice {
    /** @type {string} */
    id

    /** @type {string} */
    name

    /** @type {string} */
    description

    /** @type {int[]} */
    sets

    /**
     * @property {string} id
     * @property {string} name
     * @property {string} description
     * @property {Exercice[int]} sets
     */
    constructor(id, name, description, sets) {
      this.id = id
      this.name = name
      this.description = description
      this.sets = sets
    }
}
