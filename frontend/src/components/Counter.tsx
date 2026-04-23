import { Box, Button, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/store';
import { decrement, increment, incrementByAmount, reset } from '../features/counter/counterSlice';

export default function Counter() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Box className="p-6 rounded-2xl shadow-md bg-white">
      <Typography variant="h6" className="!mb-4">
        Redux Counter
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="outlined" onClick={() => dispatch(decrement())}>
          -
        </Button>
        <Typography variant="h4" className="min-w-[3ch] text-center">
          {value}
        </Typography>
        <Button variant="contained" onClick={() => dispatch(increment())}>
          +
        </Button>
        <Button variant="text" onClick={() => dispatch(incrementByAmount(5))}>
          +5
        </Button>
        <Button color="warning" onClick={() => dispatch(reset())}>
          reset
        </Button>
      </Stack>
    </Box>
  );
}
