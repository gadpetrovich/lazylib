import type { Lazy } from '@src/types';

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

// Todo: добавить остальные ленивые функции, каррирование, композицию, моноиды и монады.
