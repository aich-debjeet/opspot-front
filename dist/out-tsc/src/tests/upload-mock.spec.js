"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Nicolas on 22/09/2017.
 */
/* tslint:disable */
exports.uploadMock = new function () {
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
    this.post = jasmine.createSpy('post').and.callFake(callFake);
};
//# sourceMappingURL=upload-mock.spec.js.map