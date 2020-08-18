export interface Mapper<I, O> {
  (input: I): O;
}

export interface Consumer<T> {
  (input: T): void;
}

export interface Supplier<T> {
  (...args: any[]): T;
}

export interface UnaryPredicate<T> {
  (input: T): boolean;
}

export type Falsy<T> = T | null | undefined;

export class Optional<T> {
  private constructor(private readonly data: Falsy<T> = undefined) {
    this.data = data;
  }

  static of<T>(data: T): Optional<T> {
    if (!data) {
      throw new Error(
        'optional initialized with falsy value -- use ofFalsy() instead'
      );
    }

    return new Optional<T>(data);
  }

  static ofFalsy<T>(data: Falsy<T>): Optional<T> {
    return new Optional<T>(data);
  }

  static empty<T>(): Optional<T> {
    return new Optional<T>();
  }

  isPresent(): boolean {
    return !!this.data;
  }

  isEmpty(): boolean {
    return !this.isPresent();
  }

  get(): T {
    if (this.isEmpty()) {
      throw new Error('get() on empty optional');
    }

    return this.data as T;
  }

  orElse(value: T): T {
    return this.orElseGet(() => value);
  }

  orElseGet<U>(fn: Supplier<U>, ...args: any[]): T | U {
    return this.isPresent() ? (this.data as T) : fn(...args);
  }

  orElseThrow<U>(throwable: Supplier<U>): T {
    if (this.isPresent()) {
      return this.data as T;
    }

    throw throwable();
  }

  map<U>(fn: Mapper<T, U>): Optional<U> {
    return this.isPresent()
      ? Optional.of(fn(this.data as T))
      : Optional.empty();
  }

  flatMap<U>(fn: Mapper<T, Optional<U>>): Optional<U> {
    return this.isPresent() ? fn(this.data as T) : Optional.empty();
  }

  filter(fn: UnaryPredicate<T>): Optional<T> {
    if (this.isEmpty()) {
      return Optional.empty();
    }

    const typedData = this.data as T;
    return fn(typedData) ? Optional.of(typedData) : Optional.empty();
  }

  ifPresent(fn: Consumer<T>): void {
    if (this.isPresent()) {
      fn(this.data as T);
    }
  }
}
