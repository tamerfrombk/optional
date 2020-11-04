import { Optional, NoSuchElementException } from '../src/optional';

test('Constructing Optional from of()', () => {
  const opt = Optional.of('xyz');
  expect(opt).toBeDefined();
  expect(opt.isPresent()).toBe(true);
  expect(opt.isEmpty()).toBe(false);
});

test('Constructing Optional from of() - Falsy value', () => {
  const f = () => Optional.of(null);
  expect(f).toThrow();
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
  const value = Optional.ofFalsy(null)
    .map((s) => s + ' def');

  expect(value.isEmpty()).toBe(true);
});

test('flatMap()', () => {
  const value = Optional.of('abc')
    .flatMap((s) => Optional.of(s + ' def'))
    .orElse('nope');

  expect(value).toBe('abc def');
});

test('flatMap() -- falsy value', () => {
  const value = Optional.ofFalsy('')
    .flatMap((s) => Optional.of(s + ' def'))
    .orElse('me');

  expect(value).toBe('me');
});

test('orElse()', () => {
  const value = Optional.of('abc').orElse('else');

  expect(value).toBe('abc');
});

test('orElse() -- falsy value', () => {
  const value = Optional.ofFalsy('').orElse('else');

  expect(value).toBe('else');
});

test('orElseGet()', () => {
  const value = Optional.of('abc').orElseGet(() => 'x');

  expect(value).toBe('abc');
});

test('orElseGet() -- falsy value', () => {
  const value = Optional.ofFalsy(null).orElseGet(() => 3);

  expect(value).toBe(3);
});

test('orElseThrow()', () => {
  const value = Optional.of('abc').orElseThrow(
    () => new Error('should not throw')
  );

  expect(value).toBe('abc');
});

test('orElseThrow() -- falsy value', () => {
  const f = () => {
    Optional.ofFalsy(null).orElseThrow(() => new Error('Throw me!'));
  };

  expect(f).toThrow(Error);
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
  const value = Optional.ofFalsy('').orElse('null');

  expect(value).toBe('null');
});

test('ifPresent()', () => {
  const value = {
    n: 1
  };

  Optional.of(value).ifPresent((v) => (v.n = 2));

  expect(value.n).toBe(2);
});

test('ifPresentOrElse()', () => {
  const value = {
    n: 1
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const nop = () => {};

  Optional.of(value)
    .ifPresentOrElse((v) => { v.n = 2; }, nop);

  expect(value.n).toBe(2);
});

test('ifPresentOrElse() -- empty value', () => {
  const value = {
    n: 1
  };

  Optional.ofFalsy('')
    .ifPresentOrElse(() => { throw new NoSuchElementException('should not happen'); }, () => { value.n = 2; });

  expect(value.n).toBe(2);
});

test('json()', () => {
  const actual = Optional.of('abc').json();

  const expected = {
    value: 'abc'
  };

  expect(actual).toStrictEqual(expected);
});

test('json() -- empty Optional', () => {
  const actual = Optional.ofFalsy('').json();

  const expected = {
    value: null
  };

  expect(actual).toStrictEqual(expected);
});
