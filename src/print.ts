import { unlazy } from '@srcbaseFunctions';
import { LazyList } from '@srctypes';

export function printList<T>(xs: LazyList<T>) {
  let pair = unlazy(xs);
  while (pair !== null) {
    console.log(unlazy(pair.head));
    pair = unlazy(pair.tail);
  }
}
