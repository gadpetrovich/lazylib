/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { LazyList } from '../src/index';
import {
  filter,
  head,
  last,
  lazy,
  map,
  range,
  reverse,
  skip,
  take,
  toList,
  unlazy,
} from '../src/index';

function fromLazyList<T>(lazyList: LazyList<T>): T[] {
  const resultList: T[] = [];
  for (let value = lazyList(); value !== null; value = value.tail()) {
    resultList.push(value.head());
  }

  return resultList;
}

describe('list', () => {
  test('toList', () => {
    const list = [1, 2, 3, 4];
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

  test('head', () => {
    const list = range(lazy(2));
    const firstValue = head(list);

    expect(unlazy(firstValue)).toEqual(2);
  });

  test('head from empty list', () => {
    const list = toList<number>([]);

    expect(head(list)).toThrow(Error);
  });

  test('reverse', () => {
    const list = range(lazy(5));
    const first5values = take(lazy(5), list);
    const revertedValues = reverse(first5values);

    expect(fromLazyList(revertedValues)).toEqual([9, 8, 7, 6, 5]);
  });

  test('last', () => {
    const list = range(lazy(3));
    const lastValue = last(take(lazy(5), list));

    expect(unlazy(lastValue)).toEqual(7);
  });

  test('last from empty list', () => {
    const list = toList<number>([]);

    expect(last(list)).toThrow(Error);
  });
});
