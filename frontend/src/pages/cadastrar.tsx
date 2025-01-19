import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export function Component() {
  const navigate = useNavigate();

  return (
    <Box component="form" noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h3">Cadastrar</Typography>

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
    </Box>
  )
}