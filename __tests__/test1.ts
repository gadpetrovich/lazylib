import { and, lazy, unlazy } from '../src/baseFunctions';

describe('baseFunctions', () => {
  test('функция and', () => {
    const a = lazy(true);
    const b = lazy(true);
    const c = unlazy(and(a, b));
    expect(c).toBeTruthy();
  });
});
