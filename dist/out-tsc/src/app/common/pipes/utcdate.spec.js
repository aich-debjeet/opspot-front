"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var utcdate_1 = require("./utcdate");
describe('DataTableFormat', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [utcdate_1.UtcDatePipe],
            providers: [
                common_1.DatePipe, common_1.JsonPipe
            ]
        });
    });
    it('sanity', function () {
        expect(true).toBeTruthy();
    });
    it('should transform ', function () {
        var pipe = new utcdate_1.UtcDatePipe();
        var testDate = new Date();
        var outputDate = pipe.transform(testDate);
        var diffHours = Math.abs(Math.floor((testDate.getTime() - outputDate.getTime()) / (1000 * 60 * 60)));
        expect(diffHours).toBe(testDate.getTimezoneOffset() / 60);
    });
});
//# sourceMappingURL=utcdate.spec.js.map