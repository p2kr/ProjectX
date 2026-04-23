import { type PropsWithChildren, type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme } from '@mui/material';

import counterReducer from '../features/counter/counterSlice';
import messageReducer from '../features/api/messageSlice';
import type { RootState } from '../app/store';

const theme = createTheme();

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: EnhancedStore;
}

/**
 * Render a component with the Redux Provider + MUI ThemeProvider.
 * Tests can inject `preloadedState` to start from a specific store shape,
 * or pass a fully custom `store`.
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { counter: counterReducer, message: messageReducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
