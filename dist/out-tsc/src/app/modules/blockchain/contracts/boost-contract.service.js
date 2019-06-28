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
var web3_wallet_service_1 = require("../web3-wallet.service");
var token_contract_service_1 = require("./token-contract.service");
var BoostContractService = /** @class */ (function () {
    function BoostContractService(web3Wallet, tokenContract) {
        this.web3Wallet = web3Wallet;
        this.tokenContract = tokenContract;
        this.load();
    }
    BoostContractService_1 = BoostContractService;
    BoostContractService.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3Wallet.ready()];
                    case 1:
                        _a.sent();
                        this.instance = this.web3Wallet.eth.contract(this.web3Wallet.config.boost.abi, '0x')
                            .at(this.web3Wallet.config.boost.address);
                        this.boost(); // Refresh default account
                        return [2 /*return*/];
                }
            });
        });
    };
    BoostContractService.prototype.boost = function (gasPriceGwei) {
        if (gasPriceGwei === void 0) { gasPriceGwei = this.web3Wallet.config.default_gas_price || 1; }
        return __awaiter(this, void 0, void 0, function () {
            var wallet, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.instance) {
                            throw new Error('No boost instance');
                        }
                        if (!this.instance.defaultTxObject) {
                            this.instance.defaultTxObject = {};
                        }
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 1:
                        wallet = _b.sent();
                        if (!wallet) return [3 /*break*/, 3];
                        _a = this.instance.defaultTxObject;
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 2:
                        _a.from = _b.sent();
                        this.instance.defaultTxObject.gasPrice = this.web3Wallet.EthJS.toWei(gasPriceGwei, 'Gwei');
                        _b.label = 3;
                    case 3: return [2 /*return*/, this.instance];
                }
            });
        });
    };
    // Boost
    BoostContractService.prototype.create = function (guid, amount, checksum, message) {
        if (message === void 0) { message = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.web3Wallet).sendSignedContractMethod;
                        return [4 /*yield*/, this.tokenContract.token()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(),
                            'approveAndCall',
                            [
                                this.instance.address,
                                this.tokenContract.tokenToUnit(amount),
                                this.tokenContract.encodeParams([
                                    {
                                        type: 'address',
                                        value: this.web3Wallet.config.boost_wallet_address
                                    },
                                    {
                                        type: 'uint256',
                                        value: guid
                                    },
                                    {
                                        type: 'uint256',
                                        value: checksum,
                                    },
                                ])
                            ],
                            ("Network Boost for " + amount + " Tokens. " + message).trim(),
                            this.tokenContract.tokenToUnit(-amount)])];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    BoostContractService.prototype.createPeer = function (receiver, guid, amount, checksum, message) {
        if (message === void 0) { message = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.web3Wallet).sendSignedContractMethod;
                        return [4 /*yield*/, this.tokenContract.token()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(),
                            'approveAndCall',
                            [
                                this.instance.address,
                                this.tokenContract.tokenToUnit(amount),
                                this.tokenContract.encodeParams([
                                    {
                                        type: 'address',
                                        value: receiver
                                    },
                                    {
                                        type: 'uint256',
                                        value: guid
                                    },
                                    {
                                        type: 'uint256',
                                        value: checksum,
                                    },
                                ])
                            ],
                            ("Channel Boost for " + amount + " Tokens to " + receiver + ". " + message).trim(),
                            this.tokenContract.tokenToUnit(-amount)])];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    BoostContractService.prototype.accept = function (guid, message) {
        if (message === void 0) { message = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.web3Wallet).sendSignedContractMethod;
                        return [4 /*yield*/, this.boost()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(),
                            'accept',
                            [
                                guid
                            ],
                            ("Accept a Channel Boost. " + message).trim()])];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    BoostContractService.prototype.reject = function (guid, message) {
        if (message === void 0) { message = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.web3Wallet).sendSignedContractMethod;
                        return [4 /*yield*/, this.boost()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(),
                            'reject',
                            [
                                guid
                            ],
                            ("Reject a Channel Boost. " + message).trim()])];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    BoostContractService.prototype.revoke = function (guid, message) {
        if (message === void 0) { message = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.web3Wallet).sendSignedContractMethod;
                        return [4 /*yield*/, this.boost()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(),
                            'revoke',
                            [
                                guid
                            ],
                            ("Revoke a Boost. " + message).trim()])];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // Service provider
    BoostContractService._ = function (web3Wallet, tokenContract) {
        return new BoostContractService_1(web3Wallet, tokenContract);
    };
    var BoostContractService_1;
    BoostContractService = BoostContractService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [web3_wallet_service_1.Web3WalletService,
            token_contract_service_1.TokenContractService])
    ], BoostContractService);
    return BoostContractService;
}());
exports.BoostContractService = BoostContractService;
//# sourceMappingURL=boost-contract.service.js.map