/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { and, filter, lazy, map, or, range, skip, take, toList, unlazy } from '../src/baseFunctions';
import { LazyList } from '../src/types';

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

function fromLazyList<T>(lazyList: LazyList<T>): T[] {
  const resultList: T[] = [];
  for(let value = lazyList(); value !== null; value = value.tail()) {
    resultList.push(value.head());
  }

  return resultList;
}

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

  test('toList', () => {
    const list = [1,2,3,4];
    const lazyList = toList(list);
    const resultList = fromLazyList(lazyList);
    expect(resultList).toEqual(list);
  });

  test('range', () => {
    const list = range(lazy(5));
    const first = list().head();
    const second = list().tail().head();
    const result = [first, second];
    expect(result).toEqual([5, 6]);
  });

  test('take', () => {
    const list = take(lazy(5), range(lazy(6)));

    expect(fromLazyList(list)).toEqual([6, 7, 8, 9, 10]);
  });

  test('skip', () => {
    const list = skip(lazy(2), take(lazy(5), range(lazy(6))));

    expect(fromLazyList(list)).toEqual([8, 9, 10]);
  });

  test('filter', () => {
    const list = filter((v: number) => v % 2 === 0, range(lazy(0)));

    const result = take(lazy(5), list);
    expect(fromLazyList(result)).toEqual([0, 2, 4, 6, 8]);
  });

  test('map', () => {
    const sourceList = range(lazy(1));
    const stringList = map((value: number) => String(value), sourceList);
    const result = take(lazy(5), stringList);

    expect(fromLazyList(result).join('')).toEqual('12345');
  });
});
