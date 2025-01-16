import { Exercise } from "./Exercise.js";

export class TrainingSession {
    /**
     * @param {string} userId
     * @param {string} playlistId
     * @param {Exercise[]} exercises 
     * @param {Date} createdAt
     */
    constructor(userId, playlistId, exercises, createdAt) {
        this.exercises = exercises;
        this.createdAt = createdAt;
        this.userId = userId;
        this.playlistId = playlistId;
    }
}