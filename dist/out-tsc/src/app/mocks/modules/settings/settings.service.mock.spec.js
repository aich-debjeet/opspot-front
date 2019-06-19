"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.settingsServiceMock = new function () {
    var _this = this;
    this.ratingChanged = new core_1.EventEmitter();
    this.setRating = jasmine.createSpy('rating').and.callFake(function (rating) {
        _this.ratingChanged.emit(rating);
    });
};
//# sourceMappingURL=settings.service.mock.spec.js.map