import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PublicAppBar } from "../components/public-appbar";
import { RegisterSuccessDialog } from "../components/register-success-dialog";
import { UserRole } from "../models/user-role";
import { UsersService } from "../services/users-service";

export function Component() {
  const navigate = useNavigate();
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirm-password') as string;
      const bio = formData.get('bio') as string;
      const role = formData.get('role') as string;

      await UsersService.register({
        username,
        password,
        confirmPassword,
        bio,
        role: role as UserRole,
      })

      setSuccessModalOpen(true);
    } catch (error) {
      setFormError('Erro ao cadastrar usuário');
    }
  };

  return (
    <Box>
      <PublicAppBar />

      <main>
        <Box
          component="form"
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h3">Cadastrar</Typography>

          {formError ? <Alert severity="error">{formError}</Alert> : null}

          <TextField name="username" type="text" label="Usuário" variant="outlined" />
          <TextField name="password" type="password" label="Senha" variant="outlined" />
          <TextField name="confirm-password" type="password" label="Confirmar senha" variant="outlined" />
          <TextField name="bio" type="text" label="Biografia" variant="outlined" />
          <FormControl>
            <FormLabel id="form-role-label">Sou</FormLabel>
            <RadioGroup aria-labelledby="form-role-label"
              name="role" defaultValue="CLIENT">
              <FormControlLabel value="CLIENT" control={<Radio />} label="Aluno" />
              <FormControlLabel value="TRAINER" control={<Radio />} label="Personal trainer" />
              <FormControlLabel value="INFLUENCER" control={<Radio />} label="Criador de conteúdo" />
            </RadioGroup>
          </FormControl>

          <Button type="submit" variant="contained">Cadastrar</Button>
          <Button type="button" variant="text" onClick={() => navigate('/entrar')}>Já possui conta? Entrar</Button>
          <RegisterSuccessDialog open={successModalOpen} onClose={() => {
            setSuccessModalOpen(false);
          }} />
        </Box>
      </main>
    </Box>
  )
}