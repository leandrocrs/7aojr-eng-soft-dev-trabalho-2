import { v4 as uuid } from 'uuid';

import { User } from './model/User.js';
import { UserRole } from './model/UserRole.js';

export class UsersRepository {
    constructor() {
        /** @type {User[]} */
        this.users = [];
    }

    /** @param {string} username */
    async getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    /**
     * @param {Object} params
     * @param {string} params.username
     * @param {string} params.password
     * @param {string} params.bio
     * @param {UserRole} params.role
     */
    async createUser(params) {
        const newUser = new User(uuid(), params.username, params.bio, params.role, params.password);

        this.users.push(newUser);

        return newUser;
    }

}