import { describe, it, expect } from "vitest";
import {
  isValidTCID,
  assertValidTCID,
  generateTCID,
  validateTCID,
  TCIDValidationError,
} from "../src/index";

const VALID = "11084871202";
const BAD_CHECKSUM = "11084871212";

describe("isValidTCID", () => {
  it("accepts a valid number as string and number", () => {
    expect(isValidTCID(VALID)).toBe(true);
    expect(isValidTCID(Number(VALID))).toBe(true);
  });

  it("rejects a wrong checksum", () => {
    expect(isValidTCID(BAD_CHECKSUM)).toBe(false);
  });

  it("rejects wrong length and non-digits", () => {
    expect(isValidTCID("1108487120")).toBe(false); // 10 digits
    expect(isValidTCID("110848712020")).toBe(false); // 12 digits
    expect(isValidTCID("1108487120a")).toBe(false);
    expect(isValidTCID("")).toBe(false);
  });

  it("rejects a leading zero", () => {
    expect(isValidTCID("01084871202")).toBe(false);
  });
});

describe("assertValidTCID", () => {
  it("returns the normalized string for valid input", () => {
    expect(assertValidTCID(Number(VALID))).toBe(VALID);
  });

  it("throws TCIDValidationError for invalid input", () => {
    expect(() => assertValidTCID(BAD_CHECKSUM)).toThrow(TCIDValidationError);
  });
});

describe("generateTCID", () => {
  it("always produces an 11-digit, valid number", () => {
    for (let i = 0; i < 5000; i++) {
      const id = generateTCID();
      expect(id).toMatch(/^[1-9][0-9]{10}$/);
      expect(isValidTCID(id)).toBe(true);
    }
  });
});

describe("validateTCID (deprecated)", () => {
  it("preserves 1.x behavior", () => {
    expect(validateTCID(VALID)).toBe(VALID);
    expect(validateTCID(Number(VALID))).toBe(VALID);
    expect(validateTCID(VALID, "number")).toBe(Number(VALID));
    expect(() => validateTCID(BAD_CHECKSUM)).toThrow(TCIDValidationError);
  });
});
