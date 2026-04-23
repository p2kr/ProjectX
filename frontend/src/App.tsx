import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';
import Counter from './components/Counter';
import HelloFromBackend from './components/HelloFromBackend';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ProjectX — React + Redux + MUI + Tailwind
          </Typography>
          <Typography variant="caption">backend: Spring Boot @ :8080</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className="!py-8">
        <Stack spacing={4}>
          <HelloFromBackend />
          <Counter />
        </Stack>
      </Container>
    </div>
  );
}
