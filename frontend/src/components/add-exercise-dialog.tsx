import { Button, Card, Dialog, Stack, TextField, Typography } from "@mui/material";
import { Exercise } from "../models/exercise";
import { useState } from "react";

export type AddExerciseDialogProps = {
    open: boolean;
    onSubmit: (exercise: Exercise | null) => void;
}

export function AddExerciseDialog({ open, onSubmit }: AddExerciseDialogProps) {
    const [sets, setSets] = useState<number[]>([0])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            sets: sets.map((_, index) => {
                return parseInt(formData.get(`sets[${index}]`) as string)
            })
        };

        console.log(data);

        onSubmit(data)
    }

    return (
        <Dialog open={open} onClose={(reason) => {
            if (reason === 'backdropClick') {
                return;
            }

            onSubmit(null)
        }}>
            <Stack sx={{ padding: 2 }} direction="column" spacing={2} component="form" onSubmit={handleSubmit}>
                <Typography variant="h6">Adicionar exercício</Typography>
                <TextField name="name" label="Nome do exercício" type="text" />
                <TextField name="description" label="Descrição" type="text" />
                <Card sx={{ p: 2 }}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h6">Séries</Typography>
                        {
                            sets.map((set, index) => (
                                <Stack key={`#${index}:${set}`} direction="row" spacing={2}>
                                    <Typography fontWeight={500}>#{index + 1}</Typography>
                                    <TextField name={`sets[${index}]`} label="Repetições" type="number" />
                                </Stack>
                            ))
                        }
                        <Button type="button" variant="outlined" onClick={() => {
                            setSets(s => [...s, 0])
                        }}>Adicionar série</Button>
                    </Stack>
                </Card>
                <Button type="submit">Adicionar exercício</Button>
            </Stack>

        </Dialog>
    )
}