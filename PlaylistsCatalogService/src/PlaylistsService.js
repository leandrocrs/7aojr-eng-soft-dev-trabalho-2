import { z } from 'zod';

import { Exercise } from "./models/Exercise.js";
import { PlaylistsRepository } from "./PlaylistsRepository.js";
import { TrainingSessionsRepository } from './TrainingSessionsRepository.js';

export class PlaylistsService {
    /**
     * @param {PlaylistsRepository} playlistsRepository
     * @param {TrainingSessionsRepository} trainingSessionRepository
     */
    constructor(playlistsRepository, trainingSessionRepository) {
        this.playlistsRepository = playlistsRepository;
        this.trainingSessionRepository = trainingSessionRepository;
    }

    async getPlaylists() {
        return this.playlistsRepository.getAll();
    }

    /**
     * @param {string} id 
     */
    async getPlaylistById(id) {
        return this.playlistsRepository.getById(id);
    }

    /**
     * @param {Object} params 
     * @param {string} params.title
     * @param {string} params.author
     * @param {string[]} params.trainingsIds
     */
    async addPlaylist(params) {
        const playlist = z.object({
            title: z.string(),
            userId: z.string(),
            trainingsIds: z.array(z.string())
        }).parse(params);

        return this.playlistsRepository.add(playlist);
    }

    /**
     * @param {Playlist} params 
     */
    async updatePlaylist(params) {
        const playlist = z.object({
            id: z.string(),
            title: z.string(),
            userId: z.string(),
            trainingIds: z.array(z.string()),
        }).parse(params);

        return this.playlistsRepository.update(playlist);
    }

    /**
     * @param {string} id 
     */
    async deletePlaylist(id) {
        return this.playlistsRepository.delete(id);
    }

    /**
     * @param {string} playlistId 
     * @param {string} userId
     * @param {Object} trainingSession 
     * @param {Exercise[]} trainingSession.exercises
     */
    async addTrainingSession(playlistId, userId, trainingSession) {
        return this.trainingSessionRepository.add(userId, playlistId, trainingSession);
    }
}