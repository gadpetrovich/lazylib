import { Lazy, LazyList } from '@src/types';

export function and(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return () => (unlazy(a) ? unlazy(b) : false);
}

export function or(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return () => (unlazy(a) ? true : unlazy(b));
}

export function trace<T>(x: Lazy<T>, message: string): Lazy<T> {
  return () => {
    console.log(message);
    return unlazy(x);
  };
}

export function lazy<T>(value: T): Lazy<T> {
  return () => value;
}

export function unlazy<T>(value: Lazy<T>): T {
  return value();
}

export function toList(xs: number[]): LazyList<number> {
  return () => {
    if (xs.length === 0) {
      return null;
    }

    return {
      head: lazy(xs[0]),
      tail: toList(xs.slice(1)),
    };
  };
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

export function skip<T>(n: Lazy<number>, xs: LazyList<T>): LazyList<T> {
  return () => {
    const pair = unlazy(xs);
    if (pair === null) {
      return null;
    }

    const count = unlazy(n);
    if (count > 0) {
      return unlazy(skip<T>(lazy(count - 1), pair.tail));
    }

    return pair;
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

// Todo: добавить остальные ленивые функции, каррирование, композицию, моноиды и монады.
