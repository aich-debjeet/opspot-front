"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.signupModalServiceMock = new function () {
    var _this = this;
    this.defaultSubtitle = 'Signup to comment, upload, vote and earn 100+ free views on your content daily.';
    this.subtitle = this.defaultSubtitle;
    this.isOpen = new core_1.EventEmitter();
    this.display = new core_1.EventEmitter();
    this.route = '';
    this.scroll_listener = null;
    this.open = jasmine.createSpy('open').and.callFake(function () {
        _this.isOpen.next(true);
    });
    this.close = jasmine.createSpy('close').and.callFake(function () {
        _this.isOpen.next(false);
        _this.display.next('initial');
        _this.subtitle = _this.defaultSubtitle;
    });
    this.setSubtitle = jasmine.createSpy('setSubtitle').and.callFake(function (text) {
        _this.subtitle = text;
    });
    this.setDisplay = jasmine.createSpy('setDisplay').and.callFake(function (display) {
        _this.display.next(display);
        return _this;
    });
};
//# sourceMappingURL=signup-modal-service.mock.js.map