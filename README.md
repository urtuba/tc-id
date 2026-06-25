# tc-id

[![npm version](https://img.shields.io/npm/v/tc-id.svg)](https://www.npmjs.com/package/tc-id)
[![npm downloads](https://img.shields.io/npm/dm/tc-id.svg)](https://www.npmjs.com/package/tc-id)
[![license](https://img.shields.io/npm/l/tc-id.svg)](./LICENSE)
[![types](https://img.shields.io/npm/types/tc-id.svg)](./dist/index.d.ts)

Validate and generate **Turkish identity (TC Kimlik No) and tax (Vergi Kimlik No) numbers**.
Zero dependencies, fully typed, ships ESM **and** CommonJS.

> _Türkiye Cumhuriyeti kimlik numarası (TCKN) ve vergi kimlik numarası (VKN) doğrulama ve üretme paketi. Bağımlılığı yoktur, tipleri gömülüdür, hem ESM hem CommonJS destekler._

## Install

```sh
npm install tc-id
```

## Usage

```ts
import { isValidTCID, assertValidTCID, generateTCID, isValidVKN, generateVKN } from "tc-id";

// TC Kimlik No (11 digits)
isValidTCID("11084871202");     // → true
isValidTCID(11084871202);       // → true (numbers accepted)
isValidTCID("11084871212");     // → false

assertValidTCID("11084871202"); // → "11084871202" (or throws TCIDValidationError)

generateTCID();                 // → e.g. "29830543686" (random, valid-by-algorithm)

// Vergi Kimlik No (10 digits)
isValidVKN("4890598016");       // → true
isValidVKN(4890598016);         // → true (numbers accepted)
isValidVKN("4890598017");       // → false

generateVKN();                  // → e.g. "8760052205" (random, valid-by-algorithm)
```

CommonJS:

```js
const { isValidTCID, isValidVKN } = require("tc-id");
```

## API

### TC Kimlik No

| Export | Signature | Description |
| --- | --- | --- |
| `isValidTCID` | `(id: string \| number) => boolean` | Structural validation. Never throws. |
| `assertValidTCID` | `(id: string \| number) => string` | Returns the normalized 11-digit string, or throws `TCIDValidationError`. |
| `generateTCID` | `() => string` | Random, algorithmically valid 11-digit number for tests/fixtures. |
| `TCIDValidationError` | `class extends Error` | Thrown by `assertValidTCID`. |
| `validateTCID` | `(id, returnType?) => string \| number` | **Deprecated** (see below). |

A TCKN is valid when it is 11 digits, does not start with `0`, and satisfies the two checksum digits.

### Vergi Kimlik No

| Export | Signature | Description |
| --- | --- | --- |
| `isValidVKN` | `(vkn: string \| number) => boolean` | Structural validation. Never throws. |
| `generateVKN` | `() => string` | Random, algorithmically valid 10-digit number for tests/fixtures. |

A VKN is valid when it is exactly 10 digits and its 10th digit satisfies the official GİB checksum.

## ⚠️ Validation is not verification

This package checks **published checksum algorithms only**. A number that passes is *well-formed*;
it does **not** mean it belongs to a real person or registered entity. Real identity verification
must go through the official NVİ (Nüfus ve Vatandaşlık İşleri) service; tax number verification
through GİB (Gelir İdaresi Başkanlığı). Generated numbers are for test data only and must never
be presented as real identities.

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
