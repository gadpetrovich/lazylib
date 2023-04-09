export type Lazy<T> = () => T

export type LazyList<T> = Lazy<{
  head: Lazy<T>,
  tail: LazyList<T>
} | null>
