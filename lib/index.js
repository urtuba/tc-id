"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTCID = void 0;
var validateTCID = function (id) {
    var tc_id;
    if (typeof id != "string")
        tc_id = String(id);
    else
        tc_id = id;
    // Turkish identity number consists of eleven characters, all digits.
    if (!/^[0-9]{11}$/.test(tc_id)) {
        throw new Error("TC ID is not valid");
    }
    // First 9 digits of tc id is used to calculate last 2 fields
    var first9 = tc_id.slice(0, 9);
    // oddSum is calculated using even indexes since first index starts with 0 in js
    var oddSum = first9
        .split("")
        .map(function (char) { return Number(char); })
        .filter(function (num, idx) {
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
        .filter(function (num, idx) {
        if (idx % 2 == 1)
            return true;
        else
            return false;
    })
        .reduce(function (prev, next) { return prev + next; }, 0);
    // Calculate last 2 digits
    var digit10th = String((oddSum * 7 + evenSum * 9) % 10);
    var digit11th = String((oddSum * 8) % 10);
    if (digit10th != tc_id[9]) {
        throw new Error("TC ID is not valid");
    }
    if (digit11th != tc_id[10]) {
        throw new Error("TC ID is not valid");
    }
    return tc_id;
};
exports.validateTCID = validateTCID;
