import express from 'express';

const router = express.Router();

/** @type {string[]} */
const notifications = [];

router.get('/playlists', (req, res) => {
    try {
        console.log("Request Recieved at /playlists")
        return res.status(200).send({ notifications });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.get('/playlists/:id', (req, res) => {
    try {
        console.log("Request Recieved at /playlists/:id")
        return res.status(200).send({ notifications });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.post('/playlists', (req, res) => {
    try {
        return res.status(200).send({ notifications });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.put('/playlists/:id', (req, res) => {
    try {
        return res.status(200).send({ notifications });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.post('/playlists/:id/training-session', (req, res) => {
    try {
        return res.status(200).send({ notifications });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.delete('/playlists/:id', (req, res) => {
    try {
        return res.status(200).send({ notifications });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

export default router;