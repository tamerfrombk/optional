import Optional from './optional';

test('Constructing Optional from of()', () => {
  const opt = Optional.of('xyz');
  expect(opt).toBeDefined();
  expect(opt.isPresent()).toBe(true);
  expect(opt.isEmpty()).toBe(false);
});

test('Constructing Optional from of() - Falsy value', () => {
  const f = () => Optional.of(null);
  expect(f).toThrow(Error);
});

test('Constructing Optional from ofFalsy()', () => {
  const opt = Optional.ofFalsy('abc');
  expect(opt).toBeDefined();
  expect(opt.isPresent()).toBe(true);
  expect(opt.isEmpty()).toBe(false);
});

test('Constructing Optional from ofFalsy() - Falsy value', () => {
  const opt = Optional.ofFalsy(null);
  expect(opt).toBeDefined();
  expect(opt.isPresent()).toBe(false);
  expect(opt.isEmpty()).toBe(true);
});
