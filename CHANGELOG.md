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
