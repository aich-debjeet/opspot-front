"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketMock = new function () {
    this.subscribe = jasmine.createSpy('subscribe').and.stub();
    this.emit = jasmine.createSpy('emit').and.stub();
};
//# sourceMappingURL=socket-mock.spec.js.map