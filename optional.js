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

  isPresent() {
    return !!this.data;
  }

  isEmpty() {
    return !this.isPresent();
  }
}
