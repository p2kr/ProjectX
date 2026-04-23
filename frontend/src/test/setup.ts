// Extends Vitest's `expect` with jest-dom matchers like
// toBeInTheDocument(), toHaveTextContent(), etc.
import '@testing-library/jest-dom/vitest';

import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Unmount any rendered components between tests so they don't leak DOM state.
afterEach(() => {
  cleanup();
});
