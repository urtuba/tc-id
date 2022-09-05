"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTCID = void 0;
/**
 * @func validateTCID
 * @desc A function to validate TC ID numbers. It throws error or returns the id number.
 * @param id `string` | `number`
 * @param returnType `tcIdFormat` - `String` or `Number`
 * @returns Returns id number only if it is valid. type is either string or number based on returnType param.
 */
var validateTCID = function (id, returnType) {
    if (returnType === void 0) { returnType = "string"; }
    if (typeof id != "string")
        id = String(id);
    // Turkish identity number consists of eleven characters, all digits.
    if (!/^[0-9]{11}$/.test(id)) {
        throw new Error("TC ID is not valid: " + id);
    }
    // First 9 digits of tc id is used to calculate last 2 fields
    var first9 = id.slice(0, 9);
    // oddSum is calculated using even indexes since first index starts with 0 in js
    var oddSum = first9
        .split("")
        .map(function (char) { return Number(char); })
        .filter(function (_, idx) {
        if (idx % 2 == 0)
            return true;
        else
            return false;
    })
        .reduce(function (prev, next) { return prev + next; }, 0);
    // evenSum is calculated using odd indexes since first index starts with 0 in js
    var evenSum = first9
        .split("")
        .map(function (char) { return Number(char); })
        .filter(function (_, idx) {
        if (idx % 2 == 1)
            return true;
        else
            return false;
    })
        .reduce(function (prev, next) { return prev + next; }, 0);
    // Calculate last 2 digits
    var digit10th = String((oddSum * 7 + evenSum * 9) % 10);
    var digit11th = String((oddSum * 8) % 10);
    if (digit10th != id[9]) {
        throw new Error("TC ID is not valid: " + id);
    }
    if (digit11th != id[10]) {
        throw new Error("TC ID is not valid: " + id);
    }
    if (returnType && returnType == "number")
        id = Number(id);
    return id;
};
exports.validateTCID = validateTCID;
