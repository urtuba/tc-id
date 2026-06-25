/**
 * tc-id — validate and generate Turkish identity (TC Kimlik No) and tax
 * (Vergi Kimlik No) numbers.
 *
 * NOTE: This performs *algorithmic* validation only (the published checksum rules).
 * A number passing validation is well-formed; it does NOT mean it belongs to a
 * real person. Identity verification requires the official NVI service.
 */

/** Thrown by {@link assertValidTCID} (and the deprecated {@link validateTCID}). */
export class TCIDValidationError extends Error {
  constructor(message = "TC ID is not valid.") {
    super(message);
    this.name = "TCIDValidationError";
    // Restore prototype chain for environments targeting ES5.
    Object.setPrototypeOf(this, TCIDValidationError.prototype);
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const TCID_PATTERN = /^[1-9][0-9]{10}$/;

/** Single-pass checksum verification of an 11-char digit string. */
function hasValidChecksum(id: string): boolean {
  let oddSum = 0; // digits at 1-indexed odd positions (indices 0,2,4,6,8)
  let evenSum = 0; // digits at 1-indexed even positions (indices 1,3,5,7)
  for (let i = 0; i < 9; i++) {
    const digit = id.charCodeAt(i) - 48;
    if (i % 2 === 0) oddSum += digit;
    else evenSum += digit;
  }
  // 10th digit: (7·odd − even) mod 10, written as (7·odd + 9·even) mod 10.
  const digit10 = (oddSum * 7 + evenSum * 9) % 10;
  // 11th digit: (sum of first 10 digits) mod 10, which reduces to (8·odd) mod 10.
  const digit11 = (oddSum * 8) % 10;
  return digit10 === id.charCodeAt(9) - 48 && digit11 === id.charCodeAt(10) - 48;
}

function normalize(id: string | number): string {
  return typeof id === "string" ? id : String(id);
}

/**
 * Returns `true` when `id` is a structurally valid TC ID number.
 * Accepts a string or number; never throws.
 */
export function isValidTCID(id: string | number): boolean {
  const value = normalize(id);
  return TCID_PATTERN.test(value) && hasValidChecksum(value);
}

/**
 * Returns the normalized 11-digit string when `id` is valid, otherwise throws
 * {@link TCIDValidationError}. Use when an invalid value is an exceptional case.
 */
export function assertValidTCID(id: string | number): string {
  const value = normalize(id);
  if (!isValidTCID(value)) throw new TCIDValidationError();
  return value;
}

/**
 * Generates a random, structurally valid TC ID number as an 11-digit string.
 * Intended for tests, fixtures and seed data — the result is NOT a real identity.
 */
export function generateTCID(): string {
  const digits = new Array<number>(11);
  digits[0] = 1 + Math.floor(Math.random() * 9); // first digit is 1–9
  for (let i = 1; i < 9; i++) digits[i] = Math.floor(Math.random() * 10);

  let oddSum = 0;
  let evenSum = 0;
  for (let i = 0; i < 9; i++) {
    if (i % 2 === 0) oddSum += digits[i];
    else evenSum += digits[i];
  }
  digits[9] = (oddSum * 7 + evenSum * 9) % 10;
  digits[10] = (oddSum + evenSum + digits[9]) % 10;

  return digits.join("");
}

const VKN_PATTERN = /^[0-9]{10}$/;

/** Computes the VKN check digit (10th) from the first 9 digits of `id`. */
function vknCheckDigit(id: string): number {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const transformed = (id.charCodeAt(i) - 48 + (9 - i)) % 10;
    if (transformed !== 0) {
      // (transformed · 2^(9-i)) mod 9, with a 0 result folded back to 9.
      const weighted = (transformed * (1 << (9 - i))) % 9;
      sum += weighted === 0 ? 9 : weighted;
    }
  }
  return (10 - (sum % 10)) % 10;
}

/**
 * Returns `true` when `vkn` is a structurally valid Turkish tax number
 * (Vergi Kimlik Numarası): 10 digits with a correct check digit. Never throws.
 */
export function isValidVKN(vkn: string | number): boolean {
  const value = normalize(vkn);
  return VKN_PATTERN.test(value) && vknCheckDigit(value) === value.charCodeAt(9) - 48;
}

/**
 * Generates a random, structurally valid VKN as a 10-digit string.
 * For tests/fixtures only — the result is NOT a registered tax number.
 */
export function generateVKN(): string {
  let body = "";
  for (let i = 0; i < 9; i++) body += Math.floor(Math.random() * 10);
  return body + vknCheckDigit(body);
}

type TCIDFormat = "string" | "number";

/**
 * @deprecated since 2.0 — prefer {@link isValidTCID} (boolean) or
 * {@link assertValidTCID} (throws). Kept for backward compatibility; throws
 * {@link TCIDValidationError} on invalid input and echoes back a valid one.
 */
export function validateTCID(
  id: string | number,
  returnType: TCIDFormat = "string"
): string | number {
  const value = assertValidTCID(id);
  return returnType === "number" ? Number(value) : value;
}
