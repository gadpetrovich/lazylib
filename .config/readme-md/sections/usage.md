Пример использования

```typescript
import { lazy, unlazy, take, range, foldr, map } from 'ts-lazy-lib'

...
const list = take(lazy(100000), range(lazy(10)));
const lazyValue = foldr((a, b) => a + ', ' + b, lazy('!'), map(v => String(v), list));
console.log(unlazy(lazyValue));
```

Будет выведено:

```
10, 11, ..., 100008, 100009, !
```
