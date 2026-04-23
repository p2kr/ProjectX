import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import Counter from './Counter';
import { renderWithProviders } from '../test/renderWithProviders';

describe('<Counter />', () => {
  it('renders the initial counter value from the store', () => {
    renderWithProviders(<Counter />, {
      preloadedState: { counter: { value: 3 } },
    });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('increments and decrements when buttons are clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Counter />);

    expect(screen.getByText('0')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '+' }));
    expect(screen.getByText('2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '-' }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('resets to zero', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Counter />, {
      preloadedState: { counter: { value: 99 } },
    });

    await user.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
