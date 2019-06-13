"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_overlay_service_1 = require("./transaction-overlay.service");
describe('TransactionOverlayService', function () {
    var service;
    var comp = {
        show: jasmine.createSpy('show'),
        hide: jasmine.createSpy('hide')
    };
    beforeEach(function () {
        service = new transaction_overlay_service_1.TransactionOverlayService();
        service.setComponent(comp);
    });
    it('should be instantiated', function () {
        expect(service).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    // TODO: Find a way to test modals
});
//# sourceMappingURL=transaction-overlay.service.spec.js.map