import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchHello } from '../features/api/messageSlice';

export default function HelloFromBackend() {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((s) => s.message);

  return (
    <Box className="p-6 rounded-2xl shadow-md bg-white">
      <Typography variant="h6" className="!mb-4">
        Spring Boot greeting
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <TextField
          label="Your name"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          disabled={status === 'loading'}
          onClick={() => dispatch(fetchHello(name || undefined))}
        >
          {status === 'loading' ? <CircularProgress size={20} /> : 'Call /api/hello'}
        </Button>
      </Stack>

      <Box className="mt-4">
        {status === 'succeeded' && data && (
          <Alert severity="success">
            <strong>{data.message}</strong>
            <br />
            <span className="text-xs opacity-70">{data.timestamp}</span>
          </Alert>
        )}
        {status === 'failed' && (
          <Alert severity="error">
            {error ?? 'Request failed'} — is the Spring Boot backend running on :8080?
          </Alert>
        )}
      </Box>
    </Box>
  );
}
