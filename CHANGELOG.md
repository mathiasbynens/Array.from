# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.1.6](https://github.com/mathiasbynens/Array.from/compare/v1.1.5...v1.1.6) - 2024-03-22

### Commits

- [Deps] update `define-properties`, `es-abstract` [`9f507f0`](https://github.com/mathiasbynens/Array.from/commit/9f507f0d762ea5ee3979c26995a7d9682f09d859)
- [actions] remove redundant finisher [`4b253a8`](https://github.com/mathiasbynens/Array.from/commit/4b253a8a9f98f8bc6906415cfca93fd53fac7001)
- [Dev Deps] update `aud`, `npmignore`, `mock-property`, `tape` [`211c9de`](https://github.com/mathiasbynens/Array.from/commit/211c9de003ef570748d2d5c79e5c98b1ee0b7139)
- [Refactor] use `es-object-atoms` where possible [`8fea459`](https://github.com/mathiasbynens/Array.from/commit/8fea4590d68fc862a02955b9f71f7e68011f22cd)
- [meta] add missing `engines.node` [`13922dd`](https://github.com/mathiasbynens/Array.from/commit/13922dda47396aa353c329d50274d02e50793166)

## [v1.1.5](https://github.com/mathiasbynens/Array.from/compare/v1.1.4...v1.1.5) - 2023-08-26

### Commits

- [Deps] update `es-abstract` [`acddbab`](https://github.com/mathiasbynens/Array.from/commit/acddbab1f3ec413ef80b2b0d3b52baffe1142c63)
- [Deps] update `@es-shims/api`, `@ljharb/eslint-config`, `aud`, `tape` [`0d08029`](https://github.com/mathiasbynens/Array.from/commit/0d08029c3b80f69a18c52ff056a1bd2a6c184087)

## [v1.1.4](https://github.com/mathiasbynens/Array.from/compare/v1.1.3...v1.1.4) - 2023-02-23

### Commits

- [meta] use `npmignore` to autogenerate an npmignore file [`5b6ad44`](https://github.com/mathiasbynens/Array.from/commit/5b6ad44c1b60afb506f15b3e42d0fd3a676083be)
- [Deps] update `es-abstract`, `define-properties` [`f24ca6b`](https://github.com/mathiasbynens/Array.from/commit/f24ca6bac14d99f21cf753c1001f8af4d5bc24c7)
- [meta] add `auto-changelog` [`1dcac08`](https://github.com/mathiasbynens/Array.from/commit/1dcac08bcc6df529748eff36e6a3d55ce3399e7d)
- [Dev Deps] update `@ljharb/eslint-config`, `@es-shims/api`, `aud`, `tape` [`20d7da6`](https://github.com/mathiasbynens/Array.from/commit/20d7da6ba5df808c1e8aec3d8cb8978b304db3e4)
- [Tests] use `mock-property` [`0a5711e`](https://github.com/mathiasbynens/Array.from/commit/0a5711ec16b900e956405a88a7274fe3ada96c12)
- [meta] create SECURITY.md [`3c6098f`](https://github.com/mathiasbynens/Array.from/commit/3c6098f918a5bb1ce2addad95acc8fffb91a7f09)
- [Tests] skip symbol test on non-symbol envs [`4970dd1`](https://github.com/mathiasbynens/Array.from/commit/4970dd19b98bc315f4e60b7ef2a18497a53f40a2)

<!-- auto-changelog-above -->

1.1.3 / 2022-04-12
=================
* [Fix] when using an iterator, do not pass an argument to the custom constructor
* [Tests] add test that passes with es-abstract bugfix

1.1.2 / 2022-04-11
=================
* [Fix] refactor to use actual spec steps for iterators
* [Deps] update `es-abstract`
* [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `aud`, `auto-changelog`, `has-symbols`, `tape`
* [Tests] improve error messages

1.1.1 / 2021-12-09
=================
* [Deps] update `es-abstract`, `iterate-value`
* [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `@es-shims/api`, `has-symbols`, `safe-publish-latest`, `tape`; add `nyc`
* [actions] reuse common workflows
* [meta] do not publish workflow files

1.1.0 / 2020-01-17
=================
* [New] properly handle all iterables with `es-get-iterator`/`iterate-value`
* [New] add `auto` entry point
* [New] Add initial support for iterators (#27)
* [Fix] use polyfill instead of implementation in main export
* [Fix] Use `es-abstract`'s `IsConstructor` to support ES2015 classes (#54)
* [Fix] port over more polyfill edge cases from es6-shim
* [Fix] remove `system.global`; it’s unnecessary
* [Fix] add missing `is-callable` dependency
* [Fix] fix the iterator support for legacy collections (#42)
* [Fix] Safari 8: only use `for..of` on truly iterable things
* [Fix] Fix the iterator parsing feature detection for legacy Safari (#40, #39)
* [Fix] Don't use unexpected side-effects; fix incomplete processing with strings (#38, #37)
* [Fix] Segregate Map and Set object detections (#35)
* [Fix] Support surrogate pairs, align indents (#33, #34)
* [readme] fix github markdown bug
* [Deps] update `define-properties`
* [Deps] update `es-abstract`; refactor to use split ops
* [meta] Only apps should have lockfiles
* [meta] rename license file
* [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `covert`, `safe-publish-latest`, `tape`
* [Tests] use shared travis-ci configs
* [Tests] use simpler hasMap/hasSet checks (#44)
* [Tests] add `npx aud` in `posttest`
* [Tests] fix some incorrect tests that tape v5 caught
* [Tests] fix tests on node 0.10 and 0.8; fix Map/Set tests.
* [Tests] fix skip logic for “numericPropertySetterBug” browsers.
* [Tests] Skip setter test on browser with buggy descriptors (#31)

1.0.3 / 2016-09-10
=================
  * [Fix] present + `undefined` mapping argument is ignored; fix tests (#32)
  * [Deps] update `es-abstract`
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`
  * [Tests] use “pretest” for linting
  * add `safe-publish-latest`

1.0.2 / 2016-06-23
=================
  * [Fix] bound shim at entry point was double-wrapping arguments (#26)
  * [Tests] up to `node` `v6.2`
  * [Tests] Fix linting errors
  * [Deps] update `es-abstract`
  * [Dev Deps] update `@es-shims/api`, `tape`, `eslint`, `@ljharb/eslint-config`

1.0.1 / 2016-03-28
=================
  * [fix] fix "main" entry point
  * [Tests] up to `node` `v5.9`, `v4.4`

1.0.0 / 2016-01-26
=================
  * [breaking] conform to es-shim api contract
  * [Fix] bound `Array.from` should have `Array` as the `this` value.
  * [Dev Deps] update `tape`
  * [Tests] up to `node` `v5.5`
  * [Tests] add `npm run lint`

0.3.0 / 2015-12-11
=================
  * [New] Separate polyfill from feature detect (#21)
  * [Fix] add function name (#20)
  * [Fix] ensure the returned array has writable indices (#16)
  * [Dev Deps] update `tape`, `covert`
  * [Tests] up to `node` `v5.1`
  * [Docs] update URLs to be HTTPS

0.2.0 / 2014-08-18
=================

0.1.0 / 2014-01-08
=================
  * Initial release
