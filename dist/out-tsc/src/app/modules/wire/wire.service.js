"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var client_1 = require("../../services/api/client");
var wire_contract_service_1 = require("../blockchain/contracts/wire-contract.service");
var token_contract_service_1 = require("../blockchain/contracts/token-contract.service");
var web3_wallet_service_1 = require("../blockchain/web3-wallet.service");
var WireService = /** @class */ (function () {
    function WireService(client, wireContract, tokenContract, web3Wallet) {
        this.client = client;
        this.wireContract = wireContract;
        this.tokenContract = tokenContract;
        this.web3Wallet = web3Wallet;
        this.wireSent = new core_1.EventEmitter();
    }
    WireService.prototype.submitWire = function (wire) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, _a, _b, _c, _d, _e, _f, e_1, response, e_2;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        payload = wire.payload;
                        if (!wire.amount || wire.amount < 0) {
                            throw new Error('Amount should be a positive number');
                        }
                        _a = wire.payloadType;
                        switch (_a) {
                            case 'onchain': return [3 /*break*/, 1];
                            case 'creditcard': return [3 /*break*/, 15];
                            case 'offchain': return [3 /*break*/, 16];
                        }
                        return [3 /*break*/, 17];
                    case 1: return [4 /*yield*/, this.web3Wallet.ready()];
                    case 2:
                        _g.sent();
                        if (!this.web3Wallet.isUnavailable()) return [3 /*break*/, 3];
                        throw new Error('No Ethereum wallets available on your browser.');
                    case 3: return [4 /*yield*/, this.web3Wallet.unlock()];
                    case 4:
                        if (!(_g.sent())) {
                            throw new Error('Your Ethereum wallet is locked or connected to another network.');
                        }
                        _g.label = 5;
                    case 5:
                        _b = payload.receiver;
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 6:
                        if (_b == (_g.sent())) {
                            throw new Error('You cannot wire yourself.');
                        }
                        _g.label = 7;
                    case 7:
                        _g.trys.push([7, 13, , 14]);
                        if (!wire.recurring) return [3 /*break*/, 10];
                        _d = (_c = this.tokenContract).increaseApproval;
                        return [4 /*yield*/, this.wireContract.wire()];
                    case 8: return [4 /*yield*/, _d.apply(_c, [(_g.sent()).address,
                            wire.amount * 11,
                            "We need you to pre-approve Opspot Wire wallet for the recurring wire transactions."])];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10:
                        _e = payload;
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 11:
                        _e.address = _g.sent();
                        _f = payload;
                        return [4 /*yield*/, this.wireContract.create(payload.receiver, wire.amount)];
                    case 12:
                        _f.txHash = _g.sent();
                        payload.method = 'onchain';
                        return [3 /*break*/, 14];
                    case 13:
                        e_1 = _g.sent();
                        console.error('[Wire/Token]', e_1);
                        throw new Error('Either you cancelled the approval, or there was an error processing it.');
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        payload.method = 'creditcard';
                        return [3 /*break*/, 17];
                    case 16:
                        payload = { method: 'offchain', address: 'offchain' };
                        return [3 /*break*/, 17];
                    case 17:
                        _g.trys.push([17, 19, , 20]);
                        return [4 /*yield*/, this.client.post("api/v1/wire/" + wire.guid, {
                                payload: payload,
                                method: 'tokens',
                                amount: wire.amount,
                                recurring: wire.recurring
                            })];
                    case 18:
                        response = _g.sent();
                        this.wireSent.next(wire);
                        return [2 /*return*/, { done: true }];
                    case 19:
                        e_2 = _g.sent();
                        if (e_2 && e_2.stage === 'transaction') {
                            throw new Error('Sorry, your payment failed. Please, try again or use another card');
                        }
                        throw e_2;
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    WireService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [client_1.Client,
            wire_contract_service_1.WireContractService,
            token_contract_service_1.TokenContractService,
            web3_wallet_service_1.Web3WalletService])
    ], WireService);
    return WireService;
}());
exports.WireService = WireService;
//# sourceMappingURL=wire.service.js.map