import jwt from 'jsonwebtoken'

/**
 * @type {import('express').RequestHandler}
 */
export function authMiddleware(req, res, next) {
    const sendUnauthorizedResponse = () => {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.includes('Bearer')) {
        return sendUnauthorizedResponse()
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if (decodedToken == null) {
            return sendUnauthorizedResponse()
        }

        req.user = decodedToken
    } catch (error) {
        return sendUnauthorizedResponse()
    }

    next()
}