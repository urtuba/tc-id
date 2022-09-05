"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var validIDNumbers = [];
var invalidIDNumbers = [];
describe("TC ID Validation", function () {
    it("Works for valid TC ID (number)", function () {
        var id = 11084871202;
        var strResult = (0, __1.validateTCID)(id);
        var numResult = (0, __1.validateTCID)(id, "number");
        expect(strResult).toBe(String(id));
        expect(numResult).toBe(id);
    });
    it("Works for valid TC ID (string)", function () {
        var id = "11084871202";
        var strResult = (0, __1.validateTCID)(id);
        var numResult = (0, __1.validateTCID)(id, "number");
        expect(strResult).toBe(id);
        expect(numResult).toBe(Number(id));
    });
    it("Throws error for invalid TC ID (string)", function () {
        var id = "11084871212";
        try {
            var strResult = (0, __1.validateTCID)(id);
        }
        catch (error) {
            expect(error.message).toBe("TC ID is not valid: " + id);
        }
    });
    it("Throws error for invalid TC ID (number)", function () {
        var id = "11084871212";
        try {
            var strResult = (0, __1.validateTCID)(id);
        }
        catch (error) {
            expect(error.message).toBe("TC ID is not valid: " + id);
        }
    });
});
