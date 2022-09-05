class TCIDValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TCIDValidationError";
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

type tcIdFormat = "string" | "number";

/**
 * @func validateTCID
 * @desc A function to validate TC ID numbers. It throws error or returns the id number.
 * @param id `string` | `number`
 * @param returnType `tcIdFormat` - `String` or `Number`
 * @returns Returns id number only if it is valid. type is either string or number based on returnType param.
 */
export const validateTCID = (
  id: string | number,
  returnType: tcIdFormat = "string"
) => {
  if (typeof id != "string") id = String(id);

  // Turkish identity number consists of eleven characters, all digits.
  if (!/^[0-9]{11}$/.test(id)) {
    throw new TCIDValidationError("TC ID is not valid.");
  }

  // First 9 digits of tc id is used to calculate last 2 fields
  const first9 = id.slice(0, 9);

  // oddSum is calculated using even indexes since first index starts with 0 in js
  const oddSum: number = first9
    .split("")
    .map((char) => Number(char))
    .filter((_, idx) => {
      if (idx % 2 == 0) return true;
      else return false;
    })
    .reduce((prev, next) => prev + next, 0);

  // evenSum is calculated using odd indexes since first index starts with 0 in js
  const evenSum: number = first9
    .split("")
    .map((char) => Number(char))
    .filter((_, idx) => {
      if (idx % 2 == 1) return true;
      else return false;
    })
    .reduce((prev, next) => prev + next, 0);

  // Calculate last 2 digits
  const digit10th: string = String((oddSum * 7 + evenSum * 9) % 10);
  const digit11th: string = String((oddSum * 8) % 10);

  if (digit10th != id[9]) {
    throw new TCIDValidationError("TC ID is not valid.");
  }

  if (digit11th != id[10]) {
    throw new TCIDValidationError("TC ID is not valid.");
  }

  if (returnType && returnType == "number") id = Number(id);

  return id;
};
