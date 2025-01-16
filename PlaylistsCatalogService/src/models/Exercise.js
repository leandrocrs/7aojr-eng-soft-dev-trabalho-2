import { ExerciseSet } from './ExerciseSet.js';

export class Exercise {
    /**
     * 
     * @param {string} title 
     * @param {ExerciseSet[]} sets 
     */
    constructor(title, sets) {
        this.title = title;
        this.sets = sets;
    }
}