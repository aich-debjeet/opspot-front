"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localWalletServiceMock = new function () {
    this.unlock = jasmine.createSpy('unlock');
    this.prune = jasmine.createSpy('prune');
    this.create = jasmine.createSpy('create').and.returnValue('0xadress');
};
//# sourceMappingURL=local-wallet-service-mock.spec.js.map