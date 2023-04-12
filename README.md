ts-lazy-lib
===========
[![CI Status](https://img.shields.io/github/actions/workflow/status/gadpetrovich/lazylib/?branch=&style=flat-square)](https://github.com/gadpetrovich/lazylib/actions/workflows/)
[![npm](https://img.shields.io/npm/v/ts-lazy-lib.svg?style=flat-square)](https://www.npmjs.com/package/ts-lazy-lib)
[![License](https://img.shields.io/github/license/gadpetrovich/lazylib.svg?style=flat-square)](LICENSE)

Реализация ленивых вычислений в typescript

Install
-------
```sh
yarn add ts-lazy-lib # Or alternatively: `npm install ts-lazy-lib`
```

Usage
-----
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

Testing
-------
```sh
yarn test # Or alternatively: `npm test`
```

See Also
--------
- [readme-md-cli](https://www.npmjs.com/package/readme-md-cli)
- [I programmed in TypeScript like in Haskell (Lazy Evaluation)](https://www.youtube.com/watch?v=E5yAoMaVCp0)
- [lazy-evaluation](https://ru.wikipedia.org/wiki/%D0%9B%D0%B5%D0%BD%D0%B8%D0%B2%D1%8B%D0%B5_%D0%B2%D1%8B%D1%87%D0%B8%D1%81%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F)

License
-------
The MIT License. See the [license file](LICENSE) for details.
