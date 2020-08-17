'use strict';

export default class Optional {
  constructor(data) {
    this.data = data;
  }

  static of(data) {
    if (!data) {
      throw new Error(
        'Optional initialized with falsy value. Consider using ofFalsy().'
      );
    }

    return new Optional(data);
  }

  static ofFalsy(data) {
    return new Optional(data);
  }

  static empty() {
    return new Optional();
  }

  isPresent() {
    return !!this.data;
  }

  isEmpty() {
    return !this.isPresent();
  }

  get() {
    if (this.isEmpty()) {
      throw new Error('get() on empty optional');
    }

    return this.data;
  }

  orElse(value) {
    if (this.isPresent()) {
      return this.data;
    }

    return value;
  }

  orElseGet(fn, ...args) {
    if (this.isPresent()) {
      return this.data;
    }

    return fn(...args);
  }

  orElseThrow(fn) {
    if (this.isPresent()) {
      return this.data;
    }

    throw fn();
  }

  map(fn) {
    if (this.isEmpty()) {
      return Optional.empty();
    }

    const mappedValue = fn(this.data);

    return Optional.of(mappedValue);
  }

  flatMap(fn) {
    if (this.isEmpty()) {
      return Optional.empty();
    }

    if (!this.data instanceof Optional) {
      throw new Error('Data is not an Optional. Consider using map() instead.');
    }

    return this.data.map(fn);
  }

  filter(fn) {
    if (this.isEmpty()) {
      return Optional.empty();
    }

    if (fn(this.data)) {
      return Optional.of(this.data);
    }

    return Optional.empty();
  }

  ifPresent(fn) {
    if (this.isEmpty()) {
      return;
    }

    fn(this.data);
  }
}