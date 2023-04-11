/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { and, lazy, or, unlazy } from '../src/index';

const andValues = [
  [false, false, false],
  [false, true, false],
  [true, false, false],
  [true, true, true],
];

const orValues = [
  [false, false, false],
  [false, true, true],
  [true, false, true],
  [true, true, true],
];

describe('baseFunctions', () => {
  test.each(andValues)('функция and(%d, %d = %d)', (a, b, expected) => {
    const d = unlazy<boolean>(and(lazy(a), lazy(b)));
    expect(d).toEqual(expected);
  });

  test.each(orValues)('функция or(%d, %d = %d)', (a, b, expected) => {
    const d = unlazy<boolean>(or(lazy(a), lazy(b)));
    expect(d).toEqual(expected);
  });

  test('lazy<number>', () => {
    const value = lazy<number>(50);
    expect(value()).toEqual(50);
  });

  test('lazy<string>', () => {
    const value = lazy<string>('string');
    expect(value()).toEqual('string');
  });

  test('unlazy', () => {
    const value = unlazy<number>(lazy(50));
    expect(value).toEqual(50);
  });
});
