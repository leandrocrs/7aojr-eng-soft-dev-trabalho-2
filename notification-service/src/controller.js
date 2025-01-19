import express from 'express';

const router = express.Router();

/** @type {string[]} */
const notifications = [];

router.get('/notifications', (req, res) => {
    try {
        return res.status(200).send({ notifications });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

export default router;
export { notifications }