declare type tcIdFormat = "string" | "number";
/**
 * @func validateTCID
 * @desc A function to validate TC ID numbers. It throws error or returns the id number.
 * @param id `tcIdFormat` enum: `"string"`, `"number"`
 * @param returnType `String` or `Number`
 * @returns Returns the given id number only if it is valid. Return type is specified using optional returnType parameter.
 */
export declare const validateTCID: (id: string | number, returnType?: tcIdFormat) => string | number;
export {};
