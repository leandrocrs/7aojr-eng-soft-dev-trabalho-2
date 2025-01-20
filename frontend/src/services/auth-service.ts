import { jwtDecode } from 'jwt-decode';

import { httpClient } from "./http-client";
import { UserRole } from '../models/user-role';

export type UserTokenInfo = {
    "username": string
    "role": UserRole
    "userId": string
}

export class AuthService {
    static async login(username: string, password: string) {
        const response = await httpClient.post("/users/authenticate", {
            username,
            password,
        });

        console.log("Login response: ", response.data);

        window.sessionStorage.setItem("pulse-fit-auth-token", response.data.accessToken);
    }

    static getToken() {
        return window.sessionStorage.getItem("pulse-fit-auth-token");
    }

    static async isAuthenticated() {
        const token = this.getToken();

        if (!token) {
            return false;
        }

        return true;
    }

    static logout() {
        window.sessionStorage.removeItem("pulse-fit-auth-token");
    }

    static getUserInfo(): UserTokenInfo | null {
        const token = this.getToken();

        if (!token) {
            return null;
        }

        return jwtDecode(token);
    }
}