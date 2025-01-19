import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export function Component() {
  const navigate = useNavigate();

  return (
    <Box component="form" noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h3">Entrar</Typography>
      <TextField name="username" type="text" label="Usuário" variant="outlined" />
      <TextField name="password" type="password" label="Senha" variant="outlined" />
      <Button type="submit" variant="contained">Entrar</Button>
      <Button type="button" variant="text" onClick={() => navigate('/cadastrar')}>Cadastrar</Button>
    </Box>
  )
}