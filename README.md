# Optional

A minimal implementation of an Optional data type mirroring Java 8's optional.

## Quickstart

`npm i @tamerfrombk/optional`

## Examples

Constructing an Optional

```
// opt is an Optional<string> holding the value 'abc'
const opt : Optional<string> = Optional.of('abc');

// False-y values must use ofFalsy() or an exception will be thrown
const opt2 : Optional<string> = Optional.ofFalsy('');
```

Mutating an Optional

```
const mutator = s => s + ' def';

// value will be 'abc def'
const value = Optional.of('abc')
                .map(mutator)
                .orElse('other');

// otherValue will be 'other'
const otherValue = Optional.ofFalsy('')
                    .map(mutator)
                    .orElse('other');
```

TODO: add more examples

## Philosophy

TODO

## Contributing

1. Create a feature/issue on GitHub.
2. Create a PR addressing the feature/issue.
3. Have it reviewed and merged :)
