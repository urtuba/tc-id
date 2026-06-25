import { describe, it, expect, afterEach } from "vitest";
import {
  isValidTCID,
  assertValidTCID,
  generateTCID,
  isValidVKN,
  generateVKN,
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

describe("TCIDValidationError", () => {
  afterEach(() => {
    // ensure captureStackTrace is always restored
    if (!Error.captureStackTrace) {
      Error.captureStackTrace = origCaptureStackTrace;
    }
  });
  const origCaptureStackTrace = Error.captureStackTrace;

  it("constructs correctly without Error.captureStackTrace (non-V8 envs)", () => {
    // @ts-expect-error — simulate a non-V8 environment
    delete Error.captureStackTrace;
    const err = new TCIDValidationError();
    expect(err).toBeInstanceOf(TCIDValidationError);
    expect(err.name).toBe("TCIDValidationError");
    Error.captureStackTrace = origCaptureStackTrace;
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

describe("isValidVKN", () => {
  // Real, publicly-listed company tax numbers.
  const REAL_VKNS = ["8760052205", "8590380323", "8760047464"];

  it("accepts real company VKNs as string and number", () => {
    for (const vkn of REAL_VKNS) {
      expect(isValidVKN(vkn)).toBe(true);
      expect(isValidVKN(Number(vkn))).toBe(true);
    }
  });

  it("rejects a wrong check digit", () => {
    expect(isValidVKN("8760052204")).toBe(false);
    expect(isValidVKN("8760047465")).toBe(false);
  });

  it("rejects wrong length and non-digits", () => {
    expect(isValidVKN("876005220")).toBe(false); // 9
    expect(isValidVKN("87600522050")).toBe(false); // 11
    expect(isValidVKN("876005220a")).toBe(false);
  });
});

describe("generateVKN", () => {
  it("always produces a 10-digit, valid number", () => {
    for (let i = 0; i < 5000; i++) {
      const vkn = generateVKN();
      expect(vkn).toMatch(/^[0-9]{10}$/);
      expect(isValidVKN(vkn)).toBe(true);
    }
  });
});
