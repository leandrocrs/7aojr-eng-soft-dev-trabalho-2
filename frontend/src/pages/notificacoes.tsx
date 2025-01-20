import { Card, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { LoadingFullscreen } from "../components/loading-fullscreen";
import { useAuth } from "../hooks/useAuth";
import { NotificationsService } from "../services/notifications-service";

export function Component() {
    const { token } = useAuth();

    const { data: notifications } = useQuery(['notifications'], async () => {
        const response = await NotificationsService.getNotifications(token!);

        return response.notifications;
    }, {
        initialData: [],
        enabled: token != null
    })

    if (token == null) {
        return <LoadingFullscreen />
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Notificações</Typography>
            {notifications.map((notification) => (
                <Card sx={{ p: 2 }} key={notification}>
                    <Typography>{notification}</Typography>
                </Card>
            ))}
        </Stack>
    )
}