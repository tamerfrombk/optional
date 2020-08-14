import Optional from './optional';

test('Constructing Optional from of()', () => {
  expect(Optional.of('xyz')).toBeDefined();
});

test('Constructing Optional from of() - Falsy value', () => {
  const f = () => Optional.of(null);
  expect(f).toThrow(Error);
});

test('Constructing Optional from ofFalsy()', () => {
  expect(Optional.ofFalsy('abc')).toBeDefined();
});

test('Constructing Optional from ofFalsy() - Falsy value', () => {
  expect(Optional.ofFalsy(null)).toBeDefined();
});
