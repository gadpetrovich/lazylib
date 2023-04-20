/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  filter,
  foldl,
  foldr,
  lazy,
  length,
  map,
  range,
  reverse,
  skip,
  take,
  unlazy,
} from '../src/index';
import { fromList } from '../src/list';

// Проверка на переполнение стека
describe('looong list', () => {
  const count = 100000;
  const longList = [...Array(count).keys()];

  test(`take ${count}`, () => {
    const list = take(lazy(count), range(lazy(0)));

    expect(fromList(list)).toEqual(longList);
  });

  test(`long skip`, () => {
    const list = skip(lazy(count), range(lazy(0)));
    const takedList = take(lazy(1), list);

    expect(fromList(takedList)).toEqual([count]);
  });

  test(`long map`, () => {
    const sourceList = range(lazy(0));
    const stringList = map((value: number) => String(value), sourceList);
    const result = take(lazy(count), stringList);
    const expectedList = longList.map(v => String(v)).join('');

    expect(fromList(result).join('')).toEqual(expectedList);
  });

  test(`long foldr`, () => {
    const sourceList = range(lazy(0));
    const takedList = take(lazy(count), sourceList);
    const sum = foldr((a: number, b: number) => a + b, lazy(0), takedList);
    const expectedSum = longList.reduce((a, b) => a + b);

    expect(unlazy(sum)).toEqual(expectedSum);
  });

  test(`long foldl`, () => {
    const sourceList = range(lazy(0));
    const takedList = take(lazy(count), sourceList);
    const sum = foldl((a: number, b: number) => a + b, lazy(0), takedList);
    const expectedSum = longList.reduce((a, b) => a + b);

    expect(unlazy(sum)).toEqual(expectedSum);
  });

  test(`long length`, () => {
    const sourceList = range(lazy(0));
    const takedList = take(lazy(count), sourceList);
    const len = length(takedList);

    expect(unlazy(len)).toEqual(count);
  });

  test(`long reverse`, () => {
    const sourceList = range(lazy(0));
    const takedList = take(lazy(count), sourceList);
    const reversedList = reverse(takedList);
    const expectedList = longList.slice().reverse();

    expect(fromList(reversedList)).toEqual(expectedList);
  });

  test(`long filter`, () => {
    const sourceList = range(lazy(0));
    const filteredList = filter((x: number) => x % 2 === 0, sourceList);
    const takedList = take(lazy(count), filteredList);
    const expectedList = longList.map(value => value * 2);

    expect(fromList(takedList)).toEqual(expectedList);
  });
});
