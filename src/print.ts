import { unlazy } from './baseFunctions';
import type { Lazy, LazyList } from './types';

export function printList<T>(xs: LazyList<T>) {
  let pair = unlazy(xs);
  while (pair !== null) {
    console.log(unlazy(pair.head));
    pair = unlazy(pair.tail);
  }
}

export function trace<T>(x: Lazy<T>, message: string): Lazy<T> {
  return () => {
    console.log(message);
    return unlazy(x);
  };
}
