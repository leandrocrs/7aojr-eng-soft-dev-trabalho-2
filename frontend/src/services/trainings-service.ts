import { Training } from "../models/training";
import { httpClient } from "./http-client";

export class TrainingsService {
    static async getTrainings(token: string) {
        const response = await httpClient.get('/training/trainings/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data as Array<Omit<Training, 'exercises'> & { id: string }>;
    }

    static async createTraining(token: string, training: Training) {
        const response = await httpClient.post('/training/trainings/', training, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data as Training;
    }

}