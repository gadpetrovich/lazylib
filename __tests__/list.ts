/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { LazyList } from '../src/index';
import {
  filter,
  foldl,
  foldr,
  head,
  last,
  lazy,
  length,
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

  test('length', () => {
    const list = toList<number>([10, 20, 30]);
    const len = unlazy(length(list));

    expect(len).toEqual(3);
  });

  test('foldr', () => {
    const list = toList<number>([8, 12, 24, 4]);
    // Используем деление, чтобы убедиться, что у нас операция идет справа налево
    const sum = unlazy(foldr((x: number, y: number) => x / y, lazy(2), list));

    expect(sum).toEqual(8);
  });

  test('foldr from empty list', () => {
    const list = toList<number>([]);
    const result = unlazy(foldr(x => x, lazy(3), list));

    expect(result).toEqual(3);
  });

  test('foldl', () => {
    const list = toList<number>([4, 2, 4]);
    // Используем деление, чтобы убедиться, что у нас операция идет справа налево
    const sum = unlazy(foldl((x: number, y: number) => x / y, lazy(64), list));

    expect(sum).toEqual(2);
  });

  test('foldl from empty list', () => {
    const list = toList<number>([]);
    const result = unlazy(foldl(x => x, lazy(3), list));

    expect(result).toEqual(3);
  });
});

// Проверка на переполнение стека
describe('looong list', () => {
  const count = 100000;
  const longList = [...Array(count).keys()];

  test(`take ${count}`, () => {
    const list = take(lazy(count), range(lazy(0)));

    expect(fromLazyList(list)).toEqual(longList);
  });

  test(`map ${count}`, () => {
    const sourceList = range(lazy(0));
    const stringList = map((value: number) => String(value), sourceList);
    const result = take(lazy(count), stringList);
    const expectedList = longList.map(v => String(v)).join('');

    expect(fromLazyList(result).join('')).toEqual(expectedList);
  });

  test(`foldr ${count}`, () => {
    const sourceList = range(lazy(0));
    const takedList = take(lazy(count), sourceList);
    const sum = foldr((a: number, b: number) => a + b, lazy(0), takedList);
    const expectedSum = longList.reduce((a, b) => a + b);

    expect(unlazy(sum)).toEqual(expectedSum);
  });

  test(`foldl ${count}`, () => {
    const sourceList = range(lazy(0));
    const takedList = take(lazy(count), sourceList);
    const sum = foldl((a: number, b: number) => a + b, lazy(0), takedList);
    const expectedSum = longList.reduce((a, b) => a + b);

    expect(unlazy(sum)).toEqual(expectedSum);
  });

  test(`length ${count}`, () => {
    const sourceList = range(lazy(0));
    const takedList = take(lazy(count), sourceList);
    const len = length(takedList);

    expect(unlazy(len)).toEqual(count);
  });

  test(`reverse ${count}`, () => {
    const sourceList = range(lazy(0));
    const takedList = take(lazy(count), sourceList);
    const reversedList = reverse(takedList);
    const expectedList = longList.slice().reverse();

    expect(fromLazyList(reversedList)).toEqual(expectedList);
  });

  test(`filter ${count}`, () => {
    const sourceList = range(lazy(0));
    const filteredList = filter((x: number) => x % 2 === 0, sourceList);
    const takedList = take(lazy(count), filteredList);
    const expectedList = longList.map(value => value * 2);

    expect(fromLazyList(takedList)).toEqual(expectedList);
  });
});
