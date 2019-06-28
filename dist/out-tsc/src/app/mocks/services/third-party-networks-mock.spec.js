"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thirdPartyNetworksServiceMock = new function () {
    var _this = this;
    this.inProgress = false;
    this.connected = false;
    this.integration = true;
    this.getStatus = jasmine.createSpy('getStatus').and.stub();
    this.setStatusKey = jasmine.createSpy('setStatusKey').and.stub();
    this.overrideStatus = jasmine.createSpy('overrideStatus').and.stub();
    this.connect = jasmine.createSpy('connect').and.returnValue(new Promise(function (resolve, reject) { return resolve(true); }));
    this.disconnect = jasmine.createSpy('disconnect').and.stub();
    this.getStatusKey = jasmine.createSpy('getStatusKey').and.stub();
    this.isConnected = jasmine.createSpy('isConnected').and.callFake(function () {
        return _this.connected;
    });
    this.getIntegrations = jasmine.createSpy('getIntegrations').and.stub();
    this.hasIntegration = jasmine.createSpy('hasIntegration').and.callFake(function () {
        return _this.integration;
    });
    this.removeFbLogin = jasmine.createSpy('removeFbLogin').and.stub();
};
//# sourceMappingURL=third-party-networks-mock.spec.js.map