"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Marcelo on 29/06/2017.
 */
exports.clientMock = new function () {
    var _this = this;
    this.response = null;
    var callFake = function (url) {
        return new Promise(function (resolve, reject) {
            var res = _this.response;
            if (_this.response && _this.response[url]) {
                res = _this.response[url];
            }
            if (!res || (res.status && res.status === 'error' || res.status === 'failed'))
                reject(res);
            resolve(res);
        });
    };
    this.get = jasmine.createSpy('get').and.callFake(callFake);
    this.put = jasmine.createSpy('put').and.callFake(callFake);
    this.post = jasmine.createSpy('post').and.callFake(callFake);
    this.delete = jasmine.createSpy('delete').and.callFake(callFake);
};
//# sourceMappingURL=client-mock.spec.js.map