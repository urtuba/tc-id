# Changelog

All notable changes to this project are documented here.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0]

### Added
- `isValidTCID(id)` — boolean validation that never throws (new recommended API).
- `assertValidTCID(id)` — returns the normalized string or throws `TCIDValidationError`.
- `generateTCID()` — generates random, algorithmically valid numbers for tests/fixtures.
- Dual ESM + CommonJS build with a proper `exports` map and per-format type declarations.
- `engines` (Node >= 16) and `sideEffects: false`.

### Changed
- Build tool migrated from `tsc` to `tsup`; compile target raised from ES5 to ES2020.
- Test runner migrated from Jest/ts-jest to Vitest (100% line/function coverage).
- Expanded keywords for discoverability (`tckn`, `kimlik`, `tc kimlik no`, `dogrulama`, …).
- Rewrote README (bilingual, badges, API table, prominent validation-vs-verification note).

### Fixed
- Numbers with a leading zero are now correctly rejected (no real TCKN starts with `0`).
- Corrected the broken LICENSE link in the README.

### Deprecated
- `validateTCID(id, returnType?)` — behavior preserved for 1.x compatibility; prefer
  `isValidTCID` / `assertValidTCID`.

## [1.1.2] — 2022-09-05
- Initial published API: `validateTCID` (throws on invalid, returns the input).
