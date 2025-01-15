import { UserRole } from './UserRole.js'

/**
 * @class User
 * @property {string} id
 * @property {string} username
 * @property {string} bio
 * @property {UserRole} role
 * @property {string} password
 */
export class User {
    /** @type {string} */
    id;

    /** @type {string} */
    username;

    /** @type {string} */
    bio;

    /** @type {UserRole} */
    role;

    /** @type {string} */
    password;

    /**
     * @param {string} id 
     * @param {string} username 
     * @param {string} bio 
     * @param {UserRole} role 
     * @param {string} password 
     */
    constructor(id, username, bio, role, password) {
        this.id = id;
        this.username = username;
        this.bio = bio;
        this.role = role;
        this.password = password;
    }
}