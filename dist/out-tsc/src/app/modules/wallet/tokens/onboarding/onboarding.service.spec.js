"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onboarding_service_1 = require("./onboarding.service");
describe('TokenOnboardingService', function () {
    var service;
    beforeEach(function () {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        service = new onboarding_service_1.TokenOnboardingService();
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should be instantiated', function () {
        expect(service).toBeTruthy();
    });
    it('should get slide', function () {
        expect(service.slide).toBeTruthy();
    });
    it('should get next slide', function () {
        service.next();
        expect(service.currentSlide).toBe(1);
    });
});
//# sourceMappingURL=onboarding.service.spec.js.map