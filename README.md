# Optional

A minimal implementation of an Optional data type mirroring Java 8's optional.

## Quickstart

`npm i @tamerfrombk/optional`

## Features

1. Lightweight
   - `typescript` is the only dependency!
   - single source file: `src/optional.{ts,js}`
2. Functional
   - the Optional type does not mutate itself and follows functional programming best practices
3. No surprises!
   - The library works as you'd expect it to per [PLA](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).

## Examples

Constructing an Optional

```ts
// opt is an Optional<string> holding the value 'abc'
const opt: Optional<string> = Optional.of('abc');

// False-y values must use ofFalsy() or an exception will be thrown
const opt2: Optional<string> = Optional.ofFalsy('');
```

Manipulating an Optional

```ts
const mapper = (s) => s + ' def';

// value will be 'abc def'
const value: string = Optional.of('abc').map(mapper).orElse('other');

// otherValue will be 'other'
const otherValue: string = Optional.ofFalsy('').map(mapper).orElse('other');
```

Dealing with potentially "falsy" values

```ts
const value: string = myServiceThatCanReturnFalsy.doSomething(...);

// safeValue will be 'foo' in case of a falsy value
// or a value that is not equal to 'abc' with the mapper applied to it
const safeValue = Optional.ofFalsy(value)
    .filter(s => s !== 'abc')
    .map(s => /* do something with s */)
    .orElse('foo');
```

## Philosophy

Tony Hoare, a computer scientist that invented ALGOL in 1965, famously gave a talk in 2009 where he apologizes for having `null` in the language and called it his "billion dollar mistake". You've probably felt the effects of his "mistake" when your program either mysteriously crashes or throws a `NullPointerException`; this is usually due to forgetting to check whether a certain object was `null` before using it. This is a common defensive programming pitfall.

The truth of the matter is that defensive programming is only going to be so effective: programmers are still human and humans forget things all the time. So what do we do if defensive programming won't help us much? We turn to computers -- more specifically compilers -- for help.

The Optional data type is inspired by the functional programming equivalent of a `Maybe` data type; it represents the _idea_ of a value possibly existing right into the type system. This means that the compiler can help us catch `null` errors during compilation _before the program is ever shipped_.

Let's walk through a quick example.

Suppose you have the following service:

```ts
class AccountService {
  findById(id: number): Account {
    // implementation
  }
}
```

The returned `Account` object may or may not be there and we have to deal with both of those possibilities. We can deal with it either by checking for the "truthyness" of the `Account` each time we call `findById` or we can have `findById` do the check and throw if the account could not be found. If we decide to throw, we have now opened [another can of worms](https://sidburn.github.io/blog/2016/03/25/exceptions-are-evil) for us to deal with.

This is exactly where `Optional` shines; instead of throwing or repeatedly checking the `Account`, we ask the type system for help:

```ts
import { Optional } from '@tamerfrombk/optional';

class AccountService {
  findById(id: number): Optional<Account> {
    // implementation
  }
}
```

In our client code, if we try to treat the Optional as an `Account`, we'll get a compile time error:

```ts
import AccountService from './services/AccountService';

function myFunction() {
  const account = findById(0);

  const id = account.id(); // compiler error -- no id() method on Optional
}
```

The compiler is forcing us to deal with the possibility the `Account` may not exist thanks to the `Optional`. Here's one way of doing it:

```ts
import AccountService from './services/AccountService';

function myFunction() {
  const accountId = findById(0)
    .map((a) => a.id())
    .orElse(-1);
}
```

Now we've made handling the possibility of a missing account explicit.

## Contributing

1. Create a feature/issue on GitHub.
2. Create a PR addressing the feature/issue.
3. Have it reviewed and merged :)
