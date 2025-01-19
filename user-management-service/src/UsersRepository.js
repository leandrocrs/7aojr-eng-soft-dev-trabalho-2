import { randomUUID } from 'crypto'
import { User } from './model/User.js';
import { UserRole } from './model/UserRole.js';
import { UserModel } from './db/UserModel.js';

export class UsersRepository {

    /**
     * @param {string} username
     * @returns {Promise<User | null>}
     */
    async getUserByUsername(username) {
        let foundUser = null;

        try {
            foundUser = await UserModel.findOne({ username })
        } catch {
            return null;
        }

        return new User(
            foundUser.id,
            foundUser.username,
            foundUser.bio,
            foundUser.role,
            foundUser.password
        );
    }

    /**
     * @param {Object} params
     * @param {string} params.username
     * @param {string} params.password
     * @param {string} params.bio
     * @param {UserRole} params.role
     */
    async createUser(params) {
        const newUser = new UserModel({
            username: params.username,
            password: params.password,
            bio: params.bio,
            role: params.role
        });

        const savedUser = await newUser.save();

        return new User(
            savedUser.id,
            savedUser.username,
            savedUser.bio,
            savedUser.role,
        );
    }

}