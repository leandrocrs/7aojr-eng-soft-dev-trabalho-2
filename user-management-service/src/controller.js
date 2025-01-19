import express from 'express';

import { AuthService, InvalidPasswordError, UserNotFoundError } from './AuthService.js';
import { UsersRepository } from './UsersRepository.js';

const router = express.Router();

const usersRepository = new UsersRepository();
const authService = new AuthService(usersRepository);

router.post('/authenticate', async (req, res) => {
    try {
        const token = await authService.authenticate(req.body);
        return res.status(200).json({ accessToken: token});
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return res.status(404).send({ message: error.message });
        }

        if (error instanceof InvalidPasswordError) {
            return res.status(401).send({ message: error.message });
        }

        return res.status(500).send({ message: error.message });
    }

});

router.post('/register', async (req, res) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default router;