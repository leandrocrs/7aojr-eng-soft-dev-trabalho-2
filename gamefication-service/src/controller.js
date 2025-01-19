import { authMiddleware } from 'auth-middleware';
import express from 'express';

import { Challenge } from './models/Challenge.js';
import { ChallengeState } from './models/ChallengeState.js';
import { ChallengeSubscription } from './models/ChallengeSubscription.js';

const router = express.Router();

/** @type {Challenge[]} */
const challenges = [];

/** @type {ChallengeSubscription[]} */
const challengeSubscriptions = [];

router.use(authMiddleware);

router.get('/challenges', (req, res) => {
    try {
        const username = req.user.username;

        const userChallenges = challenges.map(challenge => ({
            title: challenge.title,
            state: challengeSubscriptions
                .find(subscription =>
                    subscription.username === username &&
                    subscription.challengeId === challenge.id
                )?.state ?? ChallengeState.UNSUBSCRIBED
        }));

        return res.status(200).send(userChallenges);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.post('/challenges/:id/subscription', (req, res) => {
    try {
        const { id } = req.params;
        const username = req.user.username;

        if (!challenges.some(challenge => challenge.id === id)) {
            return res.status(404).send({ message: 'Challenge not found' });
        }

        challengeSubscriptions.push(new ChallengeSubscription(username, id, ChallengeState.SUBSCRIBED));

        return res.status(201).send();
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.delete('/challenges/:id/subscription', (req, res) => {
    try {
        const { id } = req.params;
        const username = req.user.username;

        if (!challenges.some(challenge => challenge.id === id)) {
            return res.status(404).send({ message: 'Challenge not found' });
        }

        challengeSubscriptions.push(new ChallengeSubscription(username, id, ChallengeState.UNSUBSCRIBED));

        return res.status(204).send();
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

export default router;