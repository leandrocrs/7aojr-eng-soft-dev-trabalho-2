import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PublicAppBar } from "../components/public-appbar";
import { useAuth } from "../hooks/useAuth";

export function Component() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    setFormError(null);

    try {
      await login(username, password);

      navigate('/');
    } catch (error) {
      setFormError('Usuário e/ou senha inválido');
    }
  };

  return (
    <Box>
      <PublicAppBar />
      <main>
        <Box component="form"
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          onSubmit={handleSubmit}>
          <Typography variant="h3">Entrar</Typography>
          <TextField name="username" type="text" label="Usuário" variant="outlined" />
          <TextField name="password" type="password" label="Senha" variant="outlined" />
          {formError ? <Alert severity="error">{formError}</Alert> : null}
          <Button type="submit" variant="contained">Entrar</Button>
          <Button type="button" variant="text" onClick={() => navigate('/cadastrar')}>Cadastrar</Button>
        </Box>
      </main>
    </Box>
  )
}