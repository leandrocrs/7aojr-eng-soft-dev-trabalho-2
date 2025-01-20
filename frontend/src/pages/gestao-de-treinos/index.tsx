import { Alert, Box, Button, Card, CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { TrainingsService } from "../../services/trainings-service";
import { LoadingFullscreen } from "../../components/loading-fullscreen";

export function Component() {
    const navigate = useNavigate();
    const { userInfo, token } = useAuth();

    const { data: trainings, isLoading, isSuccess, isError } = useQuery(['trainings'], async () => {
        return TrainingsService.getTrainings(token!);
    }, {
        enabled: token != null,
        initialData: [],
    });

    if (userInfo == null) {
        return <LoadingFullscreen />
    }

    return (
        <Box>
            <Stack spacing={2} direction="column">
                <Typography variant="h6">Treinos</Typography>
                {isLoading ? <CircularProgress /> : null}
                {isError ? <Alert severity="error">Erro ao carregar treinos</Alert> : null}
                {isSuccess ? <Stack spacing={4} direction="column">
                    {trainings.map(training =>
                        <Card key={training.id} sx={{ p: 2 }}>
                            <Stack>
                                <Typography fontWeight={500}>{training.name}</Typography>
                                <Typography >{training.description}</Typography>
                            </Stack>
                        </Card>
                    )}
                </Stack> : null}
                <Button variant="contained" onClick={() => {
                    navigate('/gestao-de-treinos/novo');
                }}>Novo treino</Button>
            </Stack>
        </Box>
    );
}