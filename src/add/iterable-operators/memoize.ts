import { IterableX } from '../../iterable';
import { memoize } from '../../iterable/memoize';

export function memoizeProto<TSource>(
    this: Iterable<TSource>,
    readerCount?: number): IterableX<TSource>;
export function memoizeProto<TSource, TResult>(
    this: Iterable<TSource>,
    readerCount?: number,
    selector?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TResult>;
export function memoizeProto<TSource, TResult = TSource>(
    this: Iterable<TSource>,
    readerCount: number = -1,
    selector?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TSource | TResult> {
  return memoize(this, readerCount, selector);
}

IterableX.prototype.memoize = memoizeProto;

declare module '../../iterable' {
  interface IterableX<T> {
    memoize: typeof memoizeProto;
  }
}