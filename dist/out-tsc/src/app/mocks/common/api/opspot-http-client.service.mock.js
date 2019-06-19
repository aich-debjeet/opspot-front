"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Marcelo on 14/01/2019.
 */
var rxjs_1 = require("rxjs");
exports.opspotHttpClientMock = new function () {
    var _this = this;
    this.response = null;
    var callFake = function (url) {
        return new rxjs_1.Observable(function (observer) {
            var res = _this.response;
            if (_this.response && _this.response[url]) {
                res = _this.response[url];
            }
            if (!res || (res.status && res.status === 'error' || res.status === 'failed'))
                observer.error(res);
            observer.next(res);
            observer.complete();
        });
    };
    this.get = jasmine.createSpy('get').and.callFake(callFake);
    this.put = jasmine.createSpy('put').and.callFake(callFake);
    this.post = jasmine.createSpy('post').and.callFake(callFake);
    this.delete = jasmine.createSpy('delete').and.callFake(callFake);
};
//# sourceMappingURL=opspot-http-client.service.mock.js.map