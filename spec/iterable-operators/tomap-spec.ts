import * as Ix from '../Ix';
import * as test from 'tape';
const { toMap } = Ix.iterable;

test('Iterable#toMap stores values', t => {
  const res = toMap([1, 4], x => x % 2);
  t.equal(res.get(0), 4);
  t.equal(res.get(1), 1);
  t.end();
});

test('Iterable#toMap overwrites duplicates', t => {
  const res = toMap([1, 4, 2], x => x % 2);
  t.equal(res.get(0), 2);
  t.equal(res.get(1), 1);
  t.end();
});

test('Iterable#toMap with element selector', t => {
  const res = toMap([1, 4], x => x % 2, x => x + 1);
  t.equal(res.get(0), 5);
  t.equal(res.get(1), 2);
  t.end();
});

test('Iterable#toMap with element selector overwrites duplicates', t => {
  const res = toMap([1, 4, 2], x => x % 2, x => x + 1);
  t.equal(res.get(0), 3);
  t.equal(res.get(1), 2);
  t.end();
});
