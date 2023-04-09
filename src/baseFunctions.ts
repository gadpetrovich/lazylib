import { Lazy, LazyList } from "./types"


export function and(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return () => !a() ? false : b()
}

export function or(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return () => a() ? true : b()
}

export function trace<T>(x: Lazy<T>, message: string) : Lazy<T> {
  return () => {
    console.log(message)
    return x()
  }
}

export function lazy<T>(value: T): Lazy<T> {
  return () => value
}

export function unlazy<T>(value: Lazy<T>): T {
  return value()
}

export function toList(xs: number[]): LazyList<number> {
  return () => {
    if (xs.length === 0) {
      return null;
    } else {
      return {
        head: lazy(xs[0]),
        tail: toList(xs.slice(1))
      }
    }
  };
}

export function range(begin: Lazy<number>): LazyList<number> {
  return () => {
    let x = unlazy(begin)
    return {
        head: lazy(x),
        tail: range(lazy(x + 1))
    }
  }
}

export function printList<T>(xs: LazyList<T>) {
  let pair = unlazy(xs)
  while(pair !== null) {
    console.log(unlazy(pair.head))
    pair = unlazy(pair.tail)
  }
}

export function filter<T>(
  f: (value: T) => boolean, 
  xs: LazyList<T>)
  : LazyList<T> 
{
  return () => {
    let pair = unlazy(xs)
    if (pair === null) {
      return null
    } else {
      let x = unlazy(pair.head)
      if (f(x)) {
        return {
          head: lazy(x),
          tail: filter(f, pair.tail)
        }
      } else {
        return unlazy(filter(f, pair.tail))
      }
    }
  }
}

/*
function take<T>(n: Lazy<number>, xs: LazyList<T>): LazyList<T> {
  return () => {
    let m = unlazy(n)
    let pair = unlazy(xs)
    if (m > 0) {
      return {
        head: pair.head,
        tail: take(lazy(m - 1), pair.tail)
      }
    } else {
      return null
    }
  }
}*/


export function take<T>(
  n: Lazy<number>, xs: LazyList<T>
): LazyList<T> {
  return () => {
    let pair = unlazy(xs)
    if (pair === null) {
      return null
    } else {
      const count = unlazy(n)
      if (count > 0) {
        return {
          head: pair.head,
          tail: take(lazy(count - 1), pair.tail)
        }
      } else {
        return null
      }
    }
  }
}

export function skip<T>(
  n: Lazy<number>, xs: LazyList<T>
): LazyList<T> {
  return () => {
    let pair = unlazy(xs)
    if (pair === null) {
      return null
    } else {
      const count = unlazy(n)
      if (count > 0) {
        return unlazy(skip<T>(lazy(count - 1), pair.tail))
      } else {
        return pair
      }
    }
  }
}
