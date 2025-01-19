import express from 'express';
import { authMiddleware } from 'auth-middleware';

import { PlaylistsService } from './PlaylistsService.js';
import { PlaylistsRepository } from './repositories/PlaylistsRepository.js';
import { TrainingSessionsRepository } from './repositories/TrainingSessionsRepository.js';

const router = express.Router();

const playlistsRepository = new PlaylistsRepository();
const trainingSessionsRepository = new TrainingSessionsRepository();

const playlistsService = new PlaylistsService(
    playlistsRepository,
    trainingSessionsRepository
)

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        console.log(req.user);
        const username = req.user.username;
        const playlists = await playlistsService.getPlaylists(username);
        
        return res.status(200).send(playlists);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const username = req.user.username;
        const playlist = await playlistsService.getPlaylistById(username, req.params.id);
        
        if (!playlist) {
            return res.status(404).send({ message: 'Playlist not found' });
        }
        
        return res.status(200).send(playlist);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.post('', async (req, res) => {
    try {
        const username = req.user.username;
        const playlist = await playlistsService.addPlaylist({ ...req.body, author: username });
        
        return res.status(201).send(playlist);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const username = req.user.username;
        const playlistId = req.params.id;
        const playlist = await playlistsService.updatePlaylist({ ...req.body, id: playlistId, author: username });
        
        return res.status(200).send(playlist);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const username = req.user.username;
        await playlistsService.deletePlaylist(username, req.params.id);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.post('/:id/training-session', async (req, res) => {
    try {
        const username = req.user.username;
        const trainingSession = await playlistsService.addTrainingSession(req.params.id, username, req.body);
        
        return res.status(201).send(trainingSession);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});


export default router;