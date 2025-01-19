import { v4 as uuid } from 'uuid';

import { Playlist } from "../models/Playlist.js";

export class PlaylistsRepository {
    constructor() {
        /** @type {Playlist[]} */
        this.playlistsDataSource = []
    }

    /**
     * @param {string} username 
     */
    async getAll(username) {
        return this.playlistsDataSource.filter(playlist => playlist.author === username);
    }

    /**
     * @param {string} username
     * @param {string} id 
     */
    async getById(username, id) {
        return this.playlistsDataSource.find(playlist => playlist.id === id && playlist.author === username);
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
        const index = this.playlistsDataSource.findIndex(p => p.id === playlist.id && p.author === playlist.author);

        if (index === -1) {
            throw new Error('Playlist not found');
        }

        this.playlistsDataSource[index] = playlist;

        return playlist;
    }

    /**
     * @param {string} username 
     * @param {string} id 
     */
    async delete(username, id) {
        const playlistToDelete = this.playlistsDataSource.find(p => p.id === id);

        if (playlistToDelete == null || playlistToDelete.author !== username) {
            throw new Error('Playlist not found');
        }

        this.playlistsDataSource = this.playlistsDataSource.filter(p => p.id !== id);

        return playlistToDelete;
    }
}