import type { LazyList } from '@srctypes';
import { unlazy } from '@srcbaseFunctions';

export function printList<T>(xs: LazyList<T>) {
  let pair = unlazy(xs);
  while (pair !== null) {
    console.log(unlazy(pair.head));
    pair = unlazy(pair.tail);
  }
}
