/**
 * a callable interface describing a mapping function
 *
 * @type I - the input type
 * @type O - the output type
 */
export interface Mapper<I, O> {
  (input: I): O;
}

/**
 * a callable interface describing a function that that will ingest an element
 *
 * @type T - the input type
 */
export interface Consumer<T> {
  (input: T): void;
}

/**
 * a callable interface describing a function that will supply a value
 *
 * @param args the arguments to the callable
 *
 * @type T - the output type
 */
export interface Supplier<T> {
  (...args: any[]): T;
}

/**
 * a callable interface describing a predicate function taking a single input
 *
 * @param input the input element
 *
 * @type T the input type
 */
export interface UnaryPredicate<T> {
  (input: T): boolean;
}

/**
 * A type describing a JS "falsy" value
 *
 */
export type Falsy<T> = T | null | undefined;

export class Optional<T> {
  private constructor(private readonly data: Falsy<T> = undefined) {
    this.data = data;
  }

  /**
   * Returns an Optional with the specified present truthy value. If the provided value is falsy,
   * an Error is thrown. To initialize an Optional with potentially falsy data, use ofFalsy() instead.
   *
   * @param data the element to initialize the Optional with
   */
  static of<T>(data: T): Optional<T> {
    if (!data) {
      throw new Error(
        'optional initialized with falsy value -- use ofFalsy() instead'
      );
    }

    return new Optional<T>(data);
  }

  /**
   * Returns an Optional describing the specified value, if truthy, otherwise returns an empty Optional.
   *
   * @param data the element to initialize the Optional with
   */
  static ofFalsy<T>(data: Falsy<T>): Optional<T> {
    return new Optional<T>(data);
  }

  /**
   * Returns an empty Optional instance.
   */
  static empty<T>(): Optional<T> {
    return new Optional<T>();
  }

  /**
   * Return true if there is a value present, otherwise false.
   */
  isPresent(): boolean {
    return !!this.data;
  }

  /**
   * Return true if a value is absent, otherwise false.
   */
  isEmpty(): boolean {
    return !this.isPresent();
  }

  /**
   * If a value is present in this Optional, returns the value, otherwise throws Error.
   * This function should be used sparingly; prefer to use orElse() or orElseGet() to extract
   * Optional values.
   *
   */
  get(): T {
    if (this.isEmpty()) {
      throw new Error('get() on empty optional');
    }

    return this.data as T;
  }

  /**
   * Return the value if present, otherwise return other.
   *
   * @param other the other value to return
   */
  orElse(other: T): T {
    return this.orElseGet(() => other);
  }

  /**
   * Return the value if present, otherwise invoke supplier and return the result of that invocation.
   *
   * @param supplier the function supplying another value
   * @param args the arguments to the supplier
   */
  orElseGet<U>(supplier: Supplier<U>, ...args: any[]): T | U {
    return this.isPresent() ? (this.data as T) : supplier(...args);
  }

  /**
   * Return the contained value, if present, otherwise throw an exception to be created by the provided supplier.
   *
   * @param throwable a supplier function that returns a throwable object
   */
  orElseThrow<U>(throwable: Supplier<U>): T {
    if (this.isPresent()) {
      return this.data as T;
    }

    throw throwable();
  }

  /**
   * If a value is present, apply the provided mapping function to it,
   * and if the result is non-null, return an Optional describing the result.
   *
   * @param mapper the function to map over the element
   */
  map<U>(mapper: Mapper<T, U>): Optional<U> {
    return this.isPresent()
      ? Optional.of(mapper(this.data as T))
      : Optional.empty();
  }

  /**
   * If a value is present, apply the provided Optional-bearing mapping function to it,
   * return that result, otherwise return an empty Optional.
   *
   * @param mapper a function returning an Optional to map to the element contained in this Optional.
   */
  flatMap<U>(mapper: Mapper<T, Optional<U>>): Optional<U> {
    return this.isPresent() ? mapper(this.data as T) : Optional.empty();
  }

  /**
   * If a value is present, and the value matches the given predicate,
   * return an Optional describing the value, otherwise return an empty Optional.
   *
   * @param pred the unary predicate function to apply to the element
   */
  filter(pred: UnaryPredicate<T>): Optional<T> {
    if (this.isEmpty()) {
      return Optional.empty();
    }

    const typedData = this.data as T;
    return pred(typedData) ? Optional.of(typedData) : Optional.empty();
  }

  /**
   * If a value is present, invoke the specified consumer with the value, otherwise do nothing.
   *
   * @param consumer a consumer function
   */
  ifPresent(consumer: Consumer<T>): void {
    if (this.isPresent()) {
      consumer(this.data as T);
    }
  }
}
