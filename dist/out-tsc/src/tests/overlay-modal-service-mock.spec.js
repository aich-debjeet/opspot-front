"use strict";
// TODO actually implement these mocks when necessary for testing
Object.defineProperty(exports, "__esModule", { value: true });
exports.overlayModalServiceMock = new function () {
    this.setContainer = jasmine.createSpy('setContainer').and.stub();
    this.create = jasmine.createSpy('create').and.returnValue(this);
    this.setData = jasmine.createSpy('setData').and.stub();
    this.onDidDismiss = jasmine.createSpy('onDidDismiss').and.stub();
    this._didDismiss = jasmine.createSpy('_didDismiss').and.stub();
    this.present = jasmine.createSpy('present').and.stub();
    this.dismiss = jasmine.createSpy('dismiss').and.stub();
};
//# sourceMappingURL=overlay-modal-service-mock.spec.js.map