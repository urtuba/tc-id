"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTCID = void 0;
var TCIDValidationError = /** @class */ (function (_super) {
    __extends(TCIDValidationError, _super);
    function TCIDValidationError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "TCIDValidationError";
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(_this, _this.constructor);
        }
        else {
            _this.stack = new Error(message).stack;
        }
        return _this;
    }
    return TCIDValidationError;
}(Error));
/**
 * @func validateTCID
 * @desc A function to validate TC ID numbers. It throws error or returns the id number.
 * @param id `tcIdFormat` enum: `"string"`, `"number"`
 * @param returnType `String` or `Number`
 * @returns Returns the given id number only if it is valid. Return type is specified using optional returnType parameter.
 */
var validateTCID = function (id, returnType) {
    if (returnType === void 0) { returnType = "string"; }
    if (typeof id != "string")
        id = String(id);
    // Turkish identity number consists of eleven characters, all digits.
    if (!/^[0-9]{11}$/.test(id)) {
        throw new TCIDValidationError("TC ID is not valid.");
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
        throw new TCIDValidationError("TC ID is not valid.");
    }
    if (digit11th != id[10]) {
        throw new TCIDValidationError("TC ID is not valid.");
    }
    if (returnType && returnType == "number")
        id = Number(id);
    return id;
};
exports.validateTCID = validateTCID;
