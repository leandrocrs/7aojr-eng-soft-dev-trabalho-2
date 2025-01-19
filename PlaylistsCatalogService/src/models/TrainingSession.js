import { Exercise } from "./Exercise.js";

export class TrainingSession {
    /**
     * @param {string} username
     * @param {string} playlistId
     * @param {Exercise[]} exercises 
     * @param {Date} createdAt
     */
    constructor(username, playlistId, exercises, createdAt) {
        this.exercises = exercises;
        this.createdAt = createdAt;
        this.username = username;
        this.playlistId = playlistId;
    }
}