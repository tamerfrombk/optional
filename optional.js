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

  map(fn) {
    if (this.isEmpty()) {
      return Optional.empty();
    }

    const mappedValue = fn(this.data);

    return Optional.of(mappedValue);
  }

  get() {
    if (this.isEmpty()) {
      throw new Error('get() on empty optional');
    }

    return this.data;
  }
}
