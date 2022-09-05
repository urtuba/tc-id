declare type tcIdFormat = "string" | "number";
/**
 * @func validateTCID
 * @desc A function to validate TC ID numbers. It throws error or returns the id number.
 * @param id `string` | `number`
 * @param returnType `tcIdFormat` - `String` or `Number`
 * @returns Returns id number only if it is valid. type is either string or number based on returnType param.
 */
export declare const validateTCID: (id: string | number, returnType?: tcIdFormat) => string | number;
export {};
