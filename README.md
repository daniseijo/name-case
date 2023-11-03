# name-fixer

[![npm][ico-npm]][link-npm]
[![Build Status][ico-travis]][link-travis]
[![Coverage Status][ico-coveralls]][link-coveralls]
[![npm bundle size][ico-bundle-size]][link-bundle-size]

name-fixer is a fully typed implementation of `Lingua::EN::NameCase`, a library for converting strings to be properly cased. This is good for converting denormalized data to human friendly data.

**NOTE:** This is a fork from the discontinued library [@foundernest/namecase](https://github.com/foundernest/namecase). I was the author but I don't work in that company anymore. I still wanted to continue improving the library. 

## Description

Forenames and surnames are often stored either entirely in UPPERCASE or lowercase. This library allows you to convert names into the correct case where possible. Although forenames and surnames are typically stored separately if they do appear in a single string, whitespace-separated, name-fixer deals correctly with them.

Currently name-fixer correctly name cases names which include any of the following:

```txt
Mc, Mac, al, el, ap, bat, ben, bin, binti, binte, da, de, das, dos, delle, della, di, du, del, der, den, ten, ter, la, le, lo, van and von.
```

It correctly deals with names which contain apostrophes and hyphens too.

## Installation

Via npm

```bash
npm install name-fixer
```

Via yarn

```bash
yarn add name-fixer
```

Via pnpm

```bash
pnpm add name-fixer
```

## Usage

### Basic usage

```typescript
import { nameFixer } from 'name-fixer';

nameFixer('KEITH');               // => Keith
nameFixer('LEIGH-WILLIAMS');      // => Leigh-Williams
nameFixer('MCCARTHY');            // => McCarthy
nameFixer("O'CALLAGHAN");         // => O'Callaghan
nameFixer('ST. JOHN');            // => St. John
nameFixer('VON STREIT');          // => von Streit
nameFixer('AP LLWYD DAFYDD');     // => ap Llwyd Dafydd
nameFixer('HENRY VIII');          // => Henry VIII
nameFixer('VAN DYKE');            // => van Dyke
```

### Advance usage

You can override the default options by calling the `nameFixer` function with the `EnvironmentOptions` optional parameter:

```typescript
import { nameFixer } from 'name-fixer';

nameFixer('macmurdo');                        // => MacMurdo
nameFixer('macmurdo', { irish: false });      // => Macmurdo
```

You can also set the options of all the subsequent calls:

```typescript
import { nameFixer, setOptions } from 'name-fixer';

nameFixer('macmurdo');               // => MacMurdo
setOptions({ irish: false });
nameFixer('macmurdo');               // => Macmurdo
```

Or you can even create a new `Environment` object with custom options:

```typescript
import Environment from 'name-fixer';

const ncEnv = new Environment({
  lazy: false
  roman: false
});

ncEnv.nameFixer('Na li');     // => Na Li
```

## Options

- `lazy` – Default: `true`. Do not do anything if string is already mixed case and lazy option is `true`.
- `irish` – Default: `true`. Correct "Mac" exceptions.
- `spanish` – Default: `true`. Correct spanish conjunctions `y`, `e` or `i`.
- `roman` – Default: `true`. Correct roman numbers.
- `hebrew` – Default: `true`. Correct `ben`, `bat`.
- `postNominal` – Default: `true`. Correct post-nominal. e.g. `PhD`.

## Exclude Post-Nominals

```typescript
import { excludePostNominals, nameFixer } from 'name-fixer';

nameFixer('ČERNÝ MOST');         // Černý MOst
excludePostNominals('MOst');
nameFixer('ČERNÝ MOST');         // Černý Most
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information about what has changed recently.

## Testing

```bash
pnpm test
```

## Contributing

Please see the [Contributing guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) for details.

## Acknowledgements

This library is a port of the [PHP package](https://github.com/tamtamchik/namecase) by Yuri Tkachenko which is also a port of the [Perl library](https://metacpan.org/release/BARBIE/Lingua-EN-NameCase-1.19) and owes most of its functionality to the Perl version by Mark Summerfield.
Any bugs in the Typescript port are my fault.

## Credits

Original PERL `Lingua::EN::NameCase` Version:

- Copyright &copy; Mark Summerfield 1998-2014. All Rights Reserved.
- Copyright &copy; Barbie 2014-2020. All Rights Reserved.

Ruby Version:

- Copyright &copy; Aaron Patterson 2006. All Rights Reserved.

PHP Version:

- Copyright &copy; Yuri Tkachenko 2016-2020. All Rights Reserved.

Typescript version:

- Copyright &copy; [Daniel Seijo][link-author]

**NOTE:** This is a fork from [foundernest/namecase](https://github.com/foundernest/namecase) since I don't work there anymore but I still wanted to continue improving the library. 

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[ico-npm]: https://img.shields.io/npm/v/name-fixer
[ico-travis]: https://app.travis-ci.com/daniseijo/name-fixer.svg?branch=main
[ico-coveralls]: https://coveralls.io/repos/github/daniseijo/name-fixer/badge.svg?branch=main
[ico-bundle-size]: https://img.shields.io/bundlephobia/min/name-fixer

[link-npm]: https://www.npmjs.org/package/name-fixer
[link-travis]: https://app.travis-ci.com/daniseijo/name-fixer
[link-coveralls]: https://coveralls.io/github/daniseijo/name-fixer?branch=main
[link-bundle-size]: https://bundlephobia.com/result?p=name-fixer

[link-author]: https://github.com/daniseijo
