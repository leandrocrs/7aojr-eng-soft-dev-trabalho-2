import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Exercise } from "../../models/exercise";
import { AddExerciseDialog } from "../../components/add-exercise-dialog";
import { useMutation } from "@tanstack/react-query";
import { Training } from "../../models/training";
import { TrainingsService } from "../../services/trainings-service";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export function Component() {
    const [addExerciseOpen, setAddExerciseOpen] = useState(false)
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [addExerciseResetKey, setAddExerciseResetKey] = useState(0)
    const { token } = useAuth();
    const navigate = useNavigate();

    const { mutateAsync } = useMutation(['trainings'], async (training: Training) => {
        if (token == null) {
            throw new Error('Token is null')
        }

        return await TrainingsService.createTraining(token, training)
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: Training = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            exercises: exercises
        };
        await mutateAsync(data)

        navigate('/gestao-de-treinos')
    }

    const handleAddExercise = (exercise: Exercise | null) => {
        if (exercise != null) {
            setExercises((es) => [...es, exercise])
        }
        setAddExerciseOpen(false)
    }

    return (
        <>
            <Stack direction="column" component="form" spacing={2} onSubmit={handleSubmit}>
                <Typography variant="h5">Novo treino</Typography>
                <TextField name="name" label="Nome do treino" type="text" />
                <TextField name="description" label="Descrição" type="text" />
                {exercises.map((exercise) => (
                    <Card key={exercise.name}>
                        <Stack direction="column" spacing={2}>
                            <Typography fontWeight={500}>{exercise.name}</Typography>
                            <Typography>{exercise.description}</Typography>
                            <Typography fontWeight={300}>Séries</Typography>
                            <Stack direction="column" spacing={2}>
                                {exercise.sets.map((set, index) => (
                                    <Stack key={`#${index}:${set}`} direction="row" spacing={2}>
                                        <Typography>#{index + 1} - {set} repetições</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Card>
                ))}
                <Button sx={{ mb: 4 }} variant="outlined" onClick={() => {
                    setAddExerciseResetKey((k) => k + 1)
                    setAddExerciseOpen(true)
                }}>Adicionar exercício</Button>
                <Button type="submit" variant="contained">Salvar treino</Button>
            </Stack>
            <AddExerciseDialog key={addExerciseResetKey} open={addExerciseOpen} onSubmit={handleAddExercise} />
        </>
    )
}