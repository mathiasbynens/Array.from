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
