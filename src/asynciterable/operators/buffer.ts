import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';

export class BufferAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _source: AsyncIterable<TSource>;
  private _count: number;
  private _skip: number;

  constructor(source: AsyncIterable<TSource>, count: number, skip: number) {
    super();
    this._source = source;
    this._count = count;
    this._skip = skip;
  }

  async *[Symbol.asyncIterator]() {
    const buffers: TSource[][] = [];
    let i = 0;
    for await (const item of this._source) {
      if (i % this._skip === 0) {
        buffers.push([]);
      }

      for (const buff of buffers) {
        buff.push(item);
      }

      if (buffers.length > 0 && buffers[0].length === this._count) {
        yield buffers.shift()!;
      }

      i++;
    }

    while (buffers.length > 0) {
      yield buffers.shift()!;
    }
  }
}

export function buffer<TSource>(
  count: number,
  skip?: number
): OperatorAsyncFunction<TSource, TSource[]> {
  let s = skip;
  if (s == null) {
    s = count;
  }
  return function bufferOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource[]> {
    return new BufferAsyncIterable<TSource>(source, count, s!);
  };
}
