import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

import counterReducer from '../features/counter/counterSlice';
import messageReducer from '../features/api/messageSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    message: messageReducer,
  },
});

// Inferred types for the whole store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Pre-typed hooks: use throughout the app instead of plain useDispatch/useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
