"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentServiceMock = new function () {
    this.store = jasmine.createSpy('fire').and.stub();
    this.fetch = jasmine.createSpy('listen').and.stub();
    this.splice = jasmine.createSpy('unListen').and.stub();
};
//# sourceMappingURL=opspot-recent-service-mock.spec.js.map