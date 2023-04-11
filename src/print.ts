import type { LazyList } from '@src/types';
import { unlazy } from '@src/baseFunctions';

export function printList<T>(xs: LazyList<T>) {
  let pair = unlazy(xs);
  while (pair !== null) {
    console.log(unlazy(pair.head));
    pair = unlazy(pair.tail);
  }
}
