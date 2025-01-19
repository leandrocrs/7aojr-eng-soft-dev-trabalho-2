import { authMiddleware } from 'auth-middleware';
import express from 'express';

import { ClientProgressReport } from './models/ClientProgressReport.js';

const router = express.Router();

/**
 * @type {ClientProgressReport[]}
 */
const clientsProgressReports = [];

router.use(authMiddleware);

router.get('/clients/:username/progress', (req, res) => {
    try {
        const { username } = req.params;
        const clientProgress = clientsProgressReports.find(report => report.username === username);

        return res.status(200).send(clientProgress != null ? clientProgress.exercises : []);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

export default router;