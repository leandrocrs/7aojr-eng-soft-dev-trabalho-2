import { Exercise } from "./Exercise.js";

export class ClientProgressReport {
    /**
     * @param {string} username 
     * @param {Exercise} exercises 
     */
    constructor(username, exercises) {
        this.username = username;
        this.exercises = exercises;
    }
}