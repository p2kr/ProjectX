import { describe, it, expect } from 'vitest';
import counterReducer, {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from './counterSlice';

describe('counterSlice', () => {
  const initial = { value: 0 };

  it('returns initial state for an unknown action', () => {
    expect(counterReducer(undefined, { type: 'noop' })).toEqual(initial);
  });

  it('handles increment', () => {
    expect(counterReducer({ value: 1 }, increment())).toEqual({ value: 2 });
  });

  it('handles decrement', () => {
    expect(counterReducer({ value: 1 }, decrement())).toEqual({ value: 0 });
  });

  it('handles incrementByAmount', () => {
    expect(counterReducer({ value: 2 }, incrementByAmount(5))).toEqual({ value: 7 });
  });

  it('handles reset', () => {
    expect(counterReducer({ value: 42 }, reset())).toEqual({ value: 0 });
  });
});
