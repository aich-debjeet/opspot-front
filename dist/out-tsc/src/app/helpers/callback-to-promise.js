"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Callback to promise (for Web3)
 * @param {Function} fn
 * @param args
 * @returns {Promise<any>}
 */
function callbackToPromise(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        args.push(function (error, result) {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
        fn.apply(null, args);
    });
}
exports.default = callbackToPromise;
//# sourceMappingURL=callback-to-promise.js.map