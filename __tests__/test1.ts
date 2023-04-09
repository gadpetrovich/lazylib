/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { and, lazy, unlazy } from '@src/baseFunctions';

describe('baseFunctions', () => {
  test('функция and', () => {
    const a = lazy(true);
    const b = lazy(true);
    const c = and(a, b);
    const d = unlazy<boolean>(c);
    expect(d).toBeTruthy();
  });
});
