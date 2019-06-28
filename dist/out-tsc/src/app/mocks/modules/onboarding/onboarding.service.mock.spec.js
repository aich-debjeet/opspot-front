"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardingServiceMock = new function () {
    this.enable = jasmine.createSpy('enable');
    this.shouldShow = jasmine.createSpy('shouldShow');
    this.hide = jasmine.createSpy('hide');
    this.show = jasmine.createSpy('show');
};
//# sourceMappingURL=onboarding.service.mock.spec.js.map