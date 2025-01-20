import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { LoadingFullscreen } from "./loading-fullscreen";
import { Notifications } from "@mui/icons-material";
import { useNavigate } from "react-router";

export function HomeClient() {
    const { userInfo } = useAuth();
    const navigate = useNavigate();

    if (userInfo == null) {
        return <LoadingFullscreen />
    }

    return (
        <Box>
            <Typography variant="h6">Bem vindo(a) {userInfo.username}</Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Notifications />}
                onClick={() => {
                    navigate('/notificacoes')
                }}
            >Notificações</Button>

        </Box>
    );
}