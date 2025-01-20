import { UserRole } from "../models/user-role";
import { httpClient } from "./http-client";

export type RegisterUserParams = {
    username: string;
    password: string;
    confirmPassword: string;
    bio: string;
    role: UserRole;
};

export class UsersService {
    static async register(userData: RegisterUserParams) {
        const response = await httpClient.post("/users/register", userData);

        return response;
    }
}