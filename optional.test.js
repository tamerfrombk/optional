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

test('Constructing Optional from empty()', () => {
  const opt = Optional.empty();
  expect(opt).toBeDefined();
  expect(opt.isPresent()).toBe(false);
  expect(opt.isEmpty()).toBe(true);
});

test('map()', () => {
  const value = Optional.of('abc')
    .map((s) => s + ' def')
    .get();

  expect(value).toBe('abc def');
});

test('map() -- falsy value', () => {
  const f = () => {
    Optional.ofFalsy(null)
      .map((s) => s + ' def')
      .get();
  };

  expect(f).toThrow(Error);
});

test('orElse()', () => {
  const value = Optional.of('abc').orElse('else');

  expect(value).toBe('abc');
});

test('orElse() -- falsy value', () => {
  const value = Optional.ofFalsy(null).orElse('else');

  expect(value).toBe('else');
});

test('orElseGet()', () => {
  const value = Optional.of('abc').orElseGet(() => 'x');

  expect(value).toBe('abc');
});

test('orElseGet() -- falsy value', () => {
  const value = Optional.ofFalsy(null).orElseGet((a, b) => a + b, 1, 2);

  expect(value).toBe(3);
});

test('filter() -- passing filter', () => {
  const value = Optional.of('abc')
    .filter((s) => s === 'abc')
    .orElse('null');

  expect(value).toBe('abc');
});

test('filter() -- rejecting filter', () => {
  const value = Optional.of('abc')
    .filter((s) => s !== 'abc')
    .orElse('null');

  expect(value).toBe('null');
});

test('filter() -- falsy value', () => {
  const value = Optional.ofFalsy(null)
    .filter((s) => s === 'abc')
    .orElse('null');

  expect(value).toBe('null');
});

test('ifPresent()', () => {
  const value = {
    n: 1,
  };

  Optional.of(value).ifPresent((v) => (v.n = 2));

  expect(value.n).toBe(2);
});
