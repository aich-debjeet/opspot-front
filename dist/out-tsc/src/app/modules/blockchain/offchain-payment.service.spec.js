"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var offchain_payment_service_1 = require("./offchain-payment.service");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var testing_1 = require("@angular/core/testing");
describe('OffchainPaymentService', function () {
    var service;
    beforeEach(function () {
        service = new offchain_payment_service_1.OffchainPaymentService(client_mock_spec_1.clientMock);
        client_mock_spec_1.clientMock.response = {};
    });
    it('should be instantiated', function () {
        expect(service).toBeTruthy();
    });
    it('should create an offchain transaction', testing_1.fakeAsync(function () { return __awaiter(_this, void 0, void 0, function () {
        var url, txHash, args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "api/v1/blockchain/transactions/spend";
                    client_mock_spec_1.clientMock.response[url] = {
                        txHash: '0x1234'
                    };
                    return [4 /*yield*/, service.create('boost', Math.pow(10, 18))];
                case 1:
                    txHash = _a.sent();
                    jasmine.clock().tick(10);
                    expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
                    args = client_mock_spec_1.clientMock.post.calls.mostRecent().args;
                    expect(args[0]).toBe(url);
                    expect(args[1]).toEqual({ type: 'boost', amount: Math.pow(10, 18) });
                    expect(txHash).toBe('0x1234');
                    return [2 /*return*/];
            }
        });
    }); }));
});
//# sourceMappingURL=offchain-payment.service.spec.js.map