import { TrainingSession } from './models/TrainingSession.js';

export class TrainingSessionsRepository {
    constructor() {
        /** @type {TrainingSession[]} */
        this.trainingSessions = [];
    }

    /**
     * @param {string} userId
     * @param {string} playlistId
     * @param {Object} trainingSession
     * @param {Exercise[]} trainingSession.exercises
     */
    async add(userId, playlistId, trainingSession) {
        const newTrainingSession = new TrainingSession(userId, playlistId, trainingSession.exercises, new Date());

        this.trainingSessions.push(newTrainingSession);
    }
}