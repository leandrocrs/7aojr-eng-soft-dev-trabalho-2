import { z } from 'zod';

import { Exercise } from "./models/Exercise.js";
import { Playlist } from "./models/Playlist.js";
import { PlaylistsRepository } from "./repositories/PlaylistsRepository.js";
import { TrainingSessionsRepository } from './repositories/TrainingSessionsRepository.js';


export class PlaylistsService {
    /**
     * @param {PlaylistsRepository} playlistsRepository
     * @param {TrainingSessionsRepository} trainingSessionRepository
     */
    constructor(playlistsRepository, trainingSessionRepository) {
        this.playlistsRepository = playlistsRepository;
        this.trainingSessionRepository = trainingSessionRepository;
    }

    /**
     * @param {string} username 
     */
    async getPlaylists(username) {
        return this.playlistsRepository.getAll(username);
    }

    /**
     * @param {string} username
     * @param {string} id 
     */
    async getPlaylistById(username, id) {
        return this.playlistsRepository.getById(username, id);
    }

    /**
     * @param {Object} params 
     * @param {string} params.title
     * @param {string} params.author
     * @param {string[]} params.trainingsIds
     */
    async addPlaylist(params) {
        const playlist = z.object({
            title: z.string().min(1),
            author: z.string(),
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
            author: z.string(),
            trainingIds: z.array(z.string()),
        }).parse(params);

        return this.playlistsRepository.update(playlist);
    }

    /**
     * @param {string} username 
     * @param {string} id 
     */
    async deletePlaylist(username, id) {
        return this.playlistsRepository.delete(username, id);
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