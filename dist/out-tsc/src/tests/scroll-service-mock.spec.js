"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO actually implement these mocks when necessary for testing
var core_1 = require("@angular/core");
exports.scrollServiceMock = new function () {
    this.listen = jasmine.createSpy('listen').and.stub();
    this.unListen = jasmine.createSpy('unListen').and.stub();
    this.listenForView = jasmine.createSpy('listenForView').and.callFake(function () {
        return new core_1.EventEmitter();
    });
    this.viewEmitter = new core_1.EventEmitter();
};
//# sourceMappingURL=scroll-service-mock.spec.js.map