import { FitnessCenter } from '@mui/icons-material';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from "react-router";

import { router } from './routes';

const queryClient = new QueryClient()

function App() {

  return (
    <Container maxWidth="xs" >
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <FitnessCenter style={{ marginRight: '.25rem' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pulse FIT
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </main>
    </Container >
  )
}

export default App
