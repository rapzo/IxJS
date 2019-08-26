import { IterableX } from '../../iterable/iterablex';
import { flat } from '../../iterable/operators/flat';

/**
 * @ignore
 */
export function flatProto<T>(this: IterableX<T>, depth?: number): IterableX<T> {
  return flat<T>(depth)(this);
}

IterableX.prototype.flat = flatProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    flat: typeof flatProto;
  }
}
