import type { Lazy } from './types';

export function and(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return () => (unlazy(a) ? unlazy(b) : false);
}

export function or(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return () => (unlazy(a) ? true : unlazy(b));
}

export function lazy<T>(value: T): Lazy<T> {
  return () => value;
}

export function unlazy<T>(value: Lazy<T>): T {
  return value();
}

// Todo: добавить остальные ленивые функции, каррирование, композицию, моноиды и монады.
// todo: организовать ленивые функции как асинхронные
