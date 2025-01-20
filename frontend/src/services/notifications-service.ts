import { httpClient } from "./http-client";


type NotificationsResponse = {
    notifications: string[]
}

export class NotificationsService {
    static async getNotifications(token: string) {
        const response = await httpClient.get('/notifications/notifications/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return response.data as NotificationsResponse;
    }
}
