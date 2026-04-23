import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from './axiosClient';

export interface MessageDto {
  message: string;
  timestamp: string;
}

interface MessageState {
  data: MessageDto | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MessageState = {
  data: null,
  status: 'idle',
  error: null,
};

/**
 * Thunk: fetch the greeting from Spring Boot's GET /api/hello.
 * The Vite dev-server proxies /api -> http://localhost:8080.
 */
export const fetchHello = createAsyncThunk<MessageDto, string | undefined>(
  'message/fetchHello',
  async (name) => {
    const response = await axiosClient.get<MessageDto>('/hello', {
      params: name ? { name } : undefined,
    });
    return response.data;
  },
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    clear: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHello.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHello.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchHello.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const { clear } = messageSlice.actions;
export default messageSlice.reducer;
