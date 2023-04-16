import type { Lazy, LazyList } from '@/types';
import { lazy, unlazy } from '@/baseFunctions';

export function toList<T>(xs: T[]): LazyList<T> {
  return () => {
    if (xs.length === 0) {
      return null;
    }

    let current: LazyList<T> = lazy(null);
    for (let i = xs.length - 1; i >= 0; i--) {
      current = lazy({
        head: lazy(xs[i]),
        tail: current,
      });
    }

    return unlazy(current);
  };
}

export function fromList<T>(lazyList: LazyList<T>): T[] {
  const resultList: T[] = [];
  for (let value = lazyList(); value !== null; value = value.tail()) {
    resultList.push(value.head());
  }

  return resultList;
}

export function range(begin: Lazy<number>): LazyList<number> {
  return () => {
    const x = unlazy(begin);
    return {
      head: lazy(x),
      tail: range(lazy(x + 1)),
    };
  };
}

export function filter<T>(f: (_: T) => boolean, xs: LazyList<T>): LazyList<T> {
  return () => {
    const pair = unlazy(xs);
    if (pair === null) {
      return null;
    }

    const x = unlazy(pair.head);
    if (f(x)) {
      return {
        head: lazy(x),
        tail: filter(f, pair.tail),
      };
    }

    return unlazy(filter(f, pair.tail));
  };
}

export function take<T>(n: Lazy<number>, xs: LazyList<T>): LazyList<T> {
  return () => {
    const pair = unlazy(xs);
    if (pair === null) {
      return null;
    }

    const count = unlazy(n);
    if (count > 0) {
      return {
        head: pair.head,
        tail: take(lazy(count - 1), pair.tail),
      };
    }

    return null;
  };
}

/**
 * @throws {Error}
 */
export function skip<T>(n: Lazy<number>, xs: LazyList<T>): LazyList<T> {
  return () => {
    const count = unlazy(n);
    let current = unlazy(xs);
    for (let index = 0; index < count; index++) {
      if (current === null) throw new Error('Извлечение значений из пустого списка');
      current = unlazy(current.tail);
    }

    return current;
  };
}

export function map<TIN, TOUT>(func: (_: TIN) => TOUT, xs: LazyList<TIN>): LazyList<TOUT> {
  return () => {
    const pair = unlazy(xs);
    if (pair === null) {
      return null;
    }

    return {
      head: lazy(func(unlazy(pair.head))),
      tail: map(func, pair.tail),
    };
  };
}

/**
 * @throws {Error}
 */
export function head<T>(xs: LazyList<T>): Lazy<T> {
  return () => {
    const lazyElement = unlazy(take(lazy(1), xs));
    if (lazyElement === null) {
      throw new Error('В списке нет элементов');
    }

    return unlazy(lazyElement.head);
  };
}

export function reverse<T>(xs: LazyList<T>): LazyList<T> {
  return () => {
    const resultList: T[] = [];
    for (let value = unlazy(xs); value !== null; value = unlazy(value.tail)) {
      resultList.unshift(value.head());
    }

    return unlazy(toList(resultList));
  };
}

/**
 * @throws {Error}
 */
export function last<T>(xs: LazyList<T>): Lazy<T> {
  return head(reverse(xs));
}

export function length<T>(xs: LazyList<T>): Lazy<number> {
  return () => {
    let len = 0;
    for (let value = unlazy(xs); value !== null; value = unlazy(value.tail)) {
      len++;
    }

    return len;
  };
}

export function foldr<T>(func: (_1: T, _2: T) => T, init: Lazy<T>, xs: LazyList<T>): Lazy<T> {
  return () => {
    let accumulator = unlazy(init);

    const resultList: Lazy<T>[] = [];
    for (let value = unlazy(xs); value !== null; value = unlazy(value.tail)) {
      resultList.push(value.head);
    }

    for (let index = resultList.length - 1; index >= 0; index--) {
      accumulator = func(unlazy(resultList[index]), accumulator);
    }

    return accumulator;
  };
}

export function foldl<T>(func: (_1: T, _2: T) => T, init: Lazy<T>, xs: LazyList<T>): Lazy<T> {
  return () => {
    let accumulator = unlazy(init);

    for (let index = unlazy(xs); index !== null; index = unlazy(index.tail)) {
      accumulator = func(accumulator, unlazy(index.head));
    }

    return accumulator;
  };
}
