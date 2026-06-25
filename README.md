# tc-id

[![npm version](https://img.shields.io/npm/v/tc-id.svg)](https://www.npmjs.com/package/tc-id)
[![npm downloads](https://img.shields.io/npm/dm/tc-id.svg)](https://www.npmjs.com/package/tc-id)
[![license](https://img.shields.io/npm/l/tc-id.svg)](./LICENSE)
[![types](https://img.shields.io/npm/types/tc-id.svg)](./dist/index.d.ts)

Validate and generate **Turkish Citizenship Identity Numbers** (TC Kimlik No).
Zero dependencies, fully typed, ships ESM **and** CommonJS.

> _Türkiye Cumhuriyeti kimlik numarası (TCKN) doğrulama ve üretme paketi. Bağımlılığı yoktur, tipleri gömülüdür, hem ESM hem CommonJS destekler._

## Install

```sh
npm install tc-id
```

## Usage

```ts
import { isValidTCID, assertValidTCID, generateTCID } from "tc-id";

isValidTCID("11084871202");   // → true
isValidTCID(11084871202);     // → true (numbers accepted)
isValidTCID("11084871212");   // → false

assertValidTCID("11084871202"); // → "11084871202" (or throws TCIDValidationError)

generateTCID();               // → e.g. "29830543686" (random, valid-by-algorithm)
```

CommonJS:

```js
const { isValidTCID } = require("tc-id");
```

## API

| Export | Signature | Description |
| --- | --- | --- |
| `isValidTCID` | `(id: string \| number) => boolean` | Structural validation. Never throws. |
| `assertValidTCID` | `(id: string \| number) => string` | Returns the normalized 11-digit string, or throws `TCIDValidationError`. |
| `generateTCID` | `() => string` | Random, algorithmically valid 11-digit number for tests/fixtures. |
| `TCIDValidationError` | `class extends Error` | Thrown by `assertValidTCID`. |
| `validateTCID` | `(id, returnType?) => string \| number` | **Deprecated** (see below). |

A number is valid when it is 11 digits, does not start with `0`, and satisfies the
two TCKN checksum digits.

## ⚠️ Validation is not verification

This package checks the **TCKN algorithm only**. A number that passes is *well-formed*;
it does **not** mean it belongs to a real person. Real identity verification must go
through the official NVİ (Nüfus ve Vatandaşlık İşleri) service. `generateTCID` is for
test data and must never be presented as a real identity.

## Migrating from 1.x

`validateTCID` is deprecated but still works unchanged (throws on invalid, echoes a
valid value back). Prefer the new API:

```ts
// before
try { validateTCID(id); /* valid */ } catch { /* invalid */ }

// after
if (isValidTCID(id)) { /* valid */ }
```

## License

[MIT](./LICENSE) © Samed Kahyaoglu
