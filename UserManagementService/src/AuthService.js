import { z } from 'zod';
import 'dotenv/config';

import { UserRole } from "./model/UserRole.js";
import { UsersRepository } from "./UsersRepository.js";

import jwt from 'jsonwebtoken'

export class UserNotFoundError extends Error {
    constructor() {
        super('User not found');
    }
}

export class InvalidPasswordError extends Error {
    constructor() {
        super('Invalid password');
    }
}

export class AuthService {
    /**
     * @param {UsersRepository} repository
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * @param {Object} params
     * @param {string} params.username 
     * @param {string} params.password 
     */
    async authenticate(params) {
        const { username, password } = z.object({
            username: z.string(),
            password: z.string()
        }).parse(params);

        const user = await this.repository.getUserByUsername(username);

        if (!user) {
            throw new UserNotFoundError();
        }

        if (user.password !== password) {
            throw new InvalidPasswordError();
        }

        const token = jwt.sign({name: user.username, role: user.role}, process.env.ACCESS_TOKEN_SECRET)
        console.log(token)
        return token
    }

    /**
     * @param {Object} payload
     * @param {string} payload.username
     * @param {string} payload.password
     * @param {string} payload.confirmPassword
     * @param {string} payload.bio
     * @param {UserRole} payload.role
     */
    async register(payload) {
        const validationSchema = z.object({
            username: z.string().min(3),
            password: z.string().min(3),
            confirmPassword: z.string().min(3),
            bio: z.string().optional(),
            role: z.nativeEnum(Object.values(UserRole))
        }).superRefine(({ password, confirmPassword }, ctx) => {
            if (password !== confirmPassword) {
                return ctx.addIssue({
                    message: 'Passwords do not match',
                    path: ['confirmPassword']
                });
            }
        });

        const registerInfo = await validationSchema.parseAsync(payload);

        const user = await this.repository.createUser(registerInfo)

        return user;
    }
}