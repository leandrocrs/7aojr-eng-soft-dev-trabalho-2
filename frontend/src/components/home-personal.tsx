import { Box, Button, Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LoadingFullscreen } from "./loading-fullscreen";

export function HomePersonal() {
    const navigate = useNavigate();
    const { userInfo } = useAuth();

    if (userInfo == null) {
        return <LoadingFullscreen />
    }

    return (
        <Box>
            <Typography>Olá Personal {userInfo.username}</Typography>
            <Stack spacing={2} direction="column">
                <Button variant="contained" onClick={() => {
                    navigate('/gestao-de-treinos/');
                }}>Gerir treinos</Button>
            </Stack>
        </Box>
    );
}