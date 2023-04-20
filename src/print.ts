import type { LazyList } from './types';
import { unlazy } from './baseFunctions';

export function printList<T>(xs: LazyList<T>) {
  let pair = unlazy(xs);
  while (pair !== null) {
    console.log(unlazy(pair.head));
    pair = unlazy(pair.tail);
  }
}
