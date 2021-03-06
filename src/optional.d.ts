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
 * @type T - the output type
 */
export interface Supplier<T> {
    (): T;
}
/**
 * a callable interface describing a function that will perform an action
 *
 */
export interface Action {
    (): void;
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
 * an interface describing the returned object from the json() method.
 * The returned object contains a single field: "value" which describes the value in the Optional.
 * If the Optional is empty, "value" will be "null", otherwise it will be the value.
 *
 * @type T the input type
 */
export interface JSONOptional<T> {
    readonly value: T | null;
}
/**
 * A type describing a JS "falsy" value
 *
 */
export declare type Falsy<T> = T | null | undefined;
/**
 * This Error is thrown to indicate that the element requested from the Optional is not present.
 */
export declare class NoSuchElementException extends Error {
    constructor(message: string);
}
export declare class Optional<T> {
    private readonly data;
    private constructor();
    /**
     * Returns an Optional with the specified present truthy value. If the provided value is falsy,
     * a NoSuchElementException is thrown. To initialize an Optional with potentially falsy data, use ofFalsy() instead.
     *
     * @param data the element to initialize the Optional with
     */
    static of<T>(data: T): Optional<T>;
    /**
     * Returns an Optional describing the specified value, if truthy, otherwise returns an empty Optional.
     *
     * @param data the element to initialize the Optional with
     */
    static ofFalsy<T>(data: Falsy<T>): Optional<T>;
    /**
     * Returns an empty Optional instance.
     */
    static empty<T>(): Optional<T>;
    /**
     * Return true if there is a value present, otherwise false.
     */
    isPresent(): boolean;
    /**
     * Return true if a value is absent, otherwise false.
     */
    isEmpty(): boolean;
    /**
     * If a value is present in this Optional, returns the value, otherwise throws NoSuchElementException.
     * This function should be used sparingly; prefer to use orElse() or orElseGet() to extract
     * Optional values.
     *
     */
    get(): T;
    /**
     * Return the value if present, otherwise return other.
     *
     * @param other the other value to return
     */
    orElse(other: T): T;
    /**
     * Return the value if present, otherwise invoke supplier and return the result of that invocation.
     *
     * @param supplier the function supplying another value
     * @param args the arguments to the supplier
     */
    orElseGet<U>(supplier: Supplier<U>): T | U;
    /**
     * Return the contained value, if present, otherwise throw an exception to be created by the provided supplier.
     *
     * @param throwable a supplier function that returns a throwable object
     */
    orElseThrow<U>(throwable: Supplier<U>): T;
    /**
     * If a value is present, apply the provided mapping function to it,
     * and if the result is non-null, return an Optional describing the result.
     *
     * @param mapper the function to map over the element
     */
    map<U>(mapper: Mapper<T, U>): Optional<U>;
    /**
     * If a value is present, apply the provided Optional-bearing mapping function to it,
     * return that result, otherwise return an empty Optional.
     *
     * @param mapper a function returning an Optional to map to the element contained in this Optional.
     */
    flatMap<U>(mapper: Mapper<T, Optional<U>>): Optional<U>;
    /**
     * If a value is present, and the value matches the given predicate,
     * return an Optional describing the value, otherwise return an empty Optional.
     *
     * @param pred the unary predicate function to apply to the element
     */
    filter(pred: UnaryPredicate<T>): Optional<T>;
    /**
     * If a value is present, invoke the specified consumer with the value, otherwise do nothing.
     *
     * @param consumer a consumer function
     */
    ifPresent(consumer: Consumer<T>): void;
    /**
     * If a value is present, invoke the specified consumer with the value, otherwise invoke the action.
     *
     * @param consumer a consumer function
     * @param action   a action function
     */
    ifPresentOrElse(consumer: Consumer<T>, action: Action): void;
    /**
     * If a value is present, returns an Optional describing the value, otherwise returns an Optional produced by the
     * supplying function.
     *
     * @param supplier the supplier function
     */
    or<U>(supplier: Supplier<Optional<U>>): Optional<T | U>;
    /**
     * Returns a JSON object representation of the Optional.
     */
    json(): JSONOptional<T>;
}
