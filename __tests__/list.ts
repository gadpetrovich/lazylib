import { fromList } from '../src/list';
import { describe, expect, test } from '@jest/globals';
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

describe('list', () => {
  test('toList', () => {
    const list = [1, 2, 3, 4];
    const lazyList = toList(list);
    const resultList = fromList(lazyList);
    expect(resultList).toEqual(list);
  });

  test('range', () => {
    const list = range(lazy(5));
    const first = list()?.head();
    const second = list()?.tail()?.head();
    const result = [first, second];
    expect(result).toEqual([5, 6]);
  });

  test('take', () => {
    const list = take(lazy(5), range(lazy(6)));

    expect(fromList(list)).toEqual([6, 7, 8, 9, 10]);
  });

  test('skip', () => {
    const list = skip(lazy(2), take(lazy(5), range(lazy(6))));

    expect(fromList(list)).toEqual([8, 9, 10]);
  });

  test('skip from short list', () => {
    const list = skip(lazy(5), take(lazy(2), range(lazy(6))));

    expect(list).toThrow('Извлечение значений из пустого списка');
  });

  test('filter', () => {
    const list = filter((v: number) => v % 2 === 0, range(lazy(0)));

    const result = take(lazy(5), list);
    expect(fromList(result)).toEqual([0, 2, 4, 6, 8]);
  });

  test('map', () => {
    const sourceList = range(lazy(1));
    const stringList = map((value: number) => String(value), sourceList);
    const result = take(lazy(5), stringList);

    expect(fromList(result).join('')).toEqual('12345');
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

    expect(fromList(revertedValues)).toEqual([9, 8, 7, 6, 5]);
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
    // Используем деление, чтобы убедиться, что у нас операция идет слева направо
    const sum = unlazy(foldl((x: number, y: number) => x / y, lazy(64), list));

    expect(sum).toEqual(2);
  });

  test('foldl from empty list', () => {
    const list = toList<number>([]);
    const result = unlazy(foldl(x => x, lazy(3), list));

    expect(result).toEqual(3);
  });
});
