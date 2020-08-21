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
export declare type Falsy<T> = T | null | undefined;
export declare class Optional<T> {
    private readonly data;
    private constructor();
    static of<T>(data: T): Optional<T>;
    static ofFalsy<T>(data: Falsy<T>): Optional<T>;
    static empty<T>(): Optional<T>;
    isPresent(): boolean;
    isEmpty(): boolean;
    get(): T;
    orElse(value: T): T;
    orElseGet<U>(fn: Supplier<U>, ...args: any[]): T | U;
    orElseThrow<U>(throwable: Supplier<U>): T;
    map<U>(fn: Mapper<T, U>): Optional<U>;
    flatMap<U>(fn: Mapper<T, Optional<U>>): Optional<U>;
    filter(fn: UnaryPredicate<T>): Optional<T>;
    ifPresent(fn: Consumer<T>): void;
}
