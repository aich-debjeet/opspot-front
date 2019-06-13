"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var friendlydatediff_1 = require("./friendlydatediff");
describe('FriendlyDateDiff', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [friendlydatediff_1.FriendlyDateDiffPipe]
        });
    });
    it('sanity', function () {
        expect(true).toBeTruthy();
    });
    it('should transform a date with a 1 year difference', function () {
        var pipe = new friendlydatediff_1.FriendlyDateDiffPipe();
        var testDate = new Date(2019, 1, 1);
        var referenceDate = new Date(2020, 1, 1);
        var transformedDate = pipe.transform(testDate, referenceDate.toISOString());
        expect(transformedDate).toEqual("1y ago");
        transformedDate = pipe.transform(testDate, referenceDate.toString());
        expect(transformedDate).toEqual("1y ago");
        //As unix timestamp
        transformedDate = pipe.transform(testDate, referenceDate.getTime());
        expect(transformedDate).toEqual("1y ago");
    });
    it('should transform a date with a 51 week difference', function () {
        var pipe = new friendlydatediff_1.FriendlyDateDiffPipe();
        var testDate = new Date(2019, 1, 1);
        var referenceDate = new Date(2019, 12, 30);
        var transformedDate = pipe.transform(testDate, referenceDate.toISOString());
        expect(transformedDate).toEqual("51w ago");
        transformedDate = pipe.transform(testDate, referenceDate.toString());
        expect(transformedDate).toEqual("51w ago");
        //As unix timestamp
        transformedDate = pipe.transform(testDate, referenceDate.getTime());
        expect(transformedDate).toEqual("51w ago");
    });
    it('should transform a date with a 6 day difference', function () {
        var pipe = new friendlydatediff_1.FriendlyDateDiffPipe();
        var testDate = new Date(2019, 1, 1);
        var referenceDate = new Date(2019, 1, 7);
        var transformedDate = pipe.transform(testDate, referenceDate.toISOString());
        expect(transformedDate).toEqual("6d ago");
        transformedDate = pipe.transform(testDate, referenceDate.toString());
        expect(transformedDate).toEqual("6d ago");
        //As unix timestamp
        transformedDate = pipe.transform(testDate, referenceDate.getTime());
        expect(transformedDate).toEqual("6d ago");
    });
    it('should transform a date with a 23 hour difference', function () {
        var pipe = new friendlydatediff_1.FriendlyDateDiffPipe();
        var testDate = new Date(2019, 1, 1);
        var referenceDate = new Date(2019, 1, 1, 23);
        var transformedDate = pipe.transform(testDate, referenceDate.toISOString());
        expect(transformedDate).toEqual("23h ago");
        transformedDate = pipe.transform(testDate, referenceDate.toString());
        expect(transformedDate).toEqual("23h ago");
        //As unix timestamp
        transformedDate = pipe.transform(testDate, referenceDate.getTime());
        expect(transformedDate).toEqual("23h ago");
    });
    it('should transform a date with a 1 minute difference', function () {
        var pipe = new friendlydatediff_1.FriendlyDateDiffPipe();
        var testDate = new Date(2019, 1, 1, 0, 1);
        var referenceDate = new Date(2019, 1, 1, 0, 2);
        var transformedDate = pipe.transform(testDate, referenceDate.toISOString());
        expect(transformedDate).toEqual("1m ago");
        transformedDate = pipe.transform(testDate, referenceDate.toString());
        expect(transformedDate).toEqual("1m ago");
        //As unix timestamp
        transformedDate = pipe.transform(testDate, referenceDate.getTime());
        expect(transformedDate).toEqual("1m ago");
    });
    it('should transform a date without a referenceDate and use the current time', function () {
        var pipe = new friendlydatediff_1.FriendlyDateDiffPipe();
        var testDate = new Date();
        var transformedDate = pipe.transform(testDate);
        expect(transformedDate).toEqual("0s ago");
    });
    it('should transform a date without a referenceDate and use the current time minus 1 year', function () {
        var pipe = new friendlydatediff_1.FriendlyDateDiffPipe();
        var testDate = new Date();
        testDate.setFullYear(testDate.getFullYear() - 1);
        var transformedDate = pipe.transform(testDate);
        expect(transformedDate).toEqual("1y ago");
    });
});
//# sourceMappingURL=friendlydatediff.spec.js.map