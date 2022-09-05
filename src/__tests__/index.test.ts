import { validateTCID } from "..";

const validIDNumbers = [];
const invalidIDNumbers = [];

describe("TC ID Validation", () => {
  it("Works for valid TC ID (number)", () => {
    const id = 11084871202;

    const strResult = validateTCID(id);
    const numResult = validateTCID(id, "number");

    expect(strResult).toBe(String(id));
    expect(numResult).toBe(id);
  });

  it("Works for valid TC ID (string)", () => {
    const id = "11084871202";

    const strResult = validateTCID(id);
    const numResult = validateTCID(id, "number");

    expect(strResult).toBe(id);
    expect(numResult).toBe(Number(id));
  });

  it("Throws error for invalid TC ID (string)", () => {
    const id = "11084871212";
    try {
      const strResult = validateTCID(id);
    } catch (error: any) {
      expect(error.message).toBe("TC ID is not valid: " + id);
    }
  });

  it("Throws error for invalid TC ID (number)", () => {
    const id = "11084871212";
    try {
      const strResult = validateTCID(id);
    } catch (error: any) {
      expect(error.message).toBe("TC ID is not valid: " + id);
    }
  });
});
