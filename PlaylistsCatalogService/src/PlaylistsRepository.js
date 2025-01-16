import { v4 as uuid } from 'uuid';

import { Playlist } from "./models/Playlist.js";

export class PlaylistsRepository {
    constructor() {
        /** @type {Playlist[]} */
        this.playlistsDataSource = []
    }

    async getAll() {
        return this.playlistsDataSource;
    }

    /**
     * @param {string} id 
     */
    async getById(id) {
        return this.playlistsDataSource.find(playlist => playlist.id === id);
    }

    /**
     * @param {Object} playlist 
     * @param {string} playlist.title
     * @param {string} playlist.author
     * @param {string[]} playlist.trainingsIds
     */
    async add(playlist) {
        const newPlaylist = new Playlist(uuid(), playlist.title, playlist.author, playlist.trainingsIds);

        this.playlistsDataSource.push(newPlaylist);

        return newPlaylist;
    }

    /**
     * @param {Playlist} playlist 
     */
    async update(playlist) {
        const index = this.playlistsDataSource.findIndex(p => p.id === playlist.id);

        if (index === -1) {
            throw new Error('Playlist not found');
        }

        this.playlistsDataSource[index] = playlist;

        return playlist;
    }

    /**
     * @param {string} id 
     */
    async delete(id) {
        const index = this.playlistsDataSource.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error('Playlist not found');
        }

        this.playlistsDataSource.splice(index, 1);
    }

    /**
     * @param {string} playlistId 
     * @param {string} userId
     * @param {TrainingSession} trainingSession 
     */
    async addTrainingSession(playlistId, userId, trainingSession) {
        const playlist = await this.getById(playlistId);

        if (!playlist) {
            throw new Error('Playlist not found');
        }

        playlist.trainingsIds.push(trainingSession.id);

        return playlist;
    }
}