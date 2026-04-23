import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

import messageReducer, { fetchHello, clear } from './messageSlice';
import axiosClient from './axiosClient';

vi.mock('./axiosClient', () => ({
  default: { get: vi.fn() },
}));

const mockedGet = axiosClient.get as unknown as ReturnType<typeof vi.fn>;

function makeStore() {
  return configureStore({ reducer: { message: messageReducer } });
}

describe('messageSlice', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it('starts in idle state', () => {
    const store = makeStore();
    expect(store.getState().message).toEqual({
      data: null,
      status: 'idle',
      error: null,
    });
  });

  it('fetchHello: loading -> succeeded stores response data', async () => {
    const payload = { message: 'Hello, Prince!', timestamp: '2026-04-23T00:00:00Z' };
    mockedGet.mockResolvedValueOnce({ data: payload });

    const store = makeStore();
    await store.dispatch(fetchHello('Prince'));

    expect(mockedGet).toHaveBeenCalledWith('/hello', { params: { name: 'Prince' } });
    expect(store.getState().message).toEqual({
      data: payload,
      status: 'succeeded',
      error: null,
    });
  });

  it('fetchHello: rejected stores the error message', async () => {
    mockedGet.mockRejectedValueOnce(new Error('boom'));

    const store = makeStore();
    await store.dispatch(fetchHello());

    expect(store.getState().message.status).toBe('failed');
    expect(store.getState().message.error).toBe('boom');
  });

  it('clear() resets back to idle', async () => {
    mockedGet.mockResolvedValueOnce({
      data: { message: 'x', timestamp: 'now' },
    });

    const store = makeStore();
    await store.dispatch(fetchHello());
    store.dispatch(clear());

    expect(store.getState().message).toEqual({
      data: null,
      status: 'idle',
      error: null,
    });
  });
});
