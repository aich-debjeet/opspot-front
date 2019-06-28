"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Eth = require("ethjs");
var SignerProvider = require("ethjs-provider-signer");
var local_wallet_service_1 = require("./local-wallet.service");
var callback_to_promise_1 = require("../../helpers/callback-to-promise");
var async_sleep_1 = require("../../helpers/async-sleep");
var transaction_overlay_service_1 = require("./transaction-overlay/transaction-overlay.service");
var Web3WalletService = /** @class */ (function () {
    function Web3WalletService(localWallet, transactionOverlay) {
        this.localWallet = localWallet;
        this.transactionOverlay = transactionOverlay;
        this.config = window.Opspot.blockchain;
        this.unavailable = false;
        this.local = false;
        this._web3LoadAttempt = 0;
    }
    Web3WalletService_1 = Web3WalletService;
    // Wallet
    Web3WalletService.prototype.getWallets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.isSameNetwork()];
                    case 2:
                        if (!(_a.sent())) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.eth.accounts()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Web3WalletService.prototype.getCurrentWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWallets()];
                    case 1:
                        wallets = _a.sent();
                        if (!wallets || !wallets.length) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, wallets[0]];
                }
            });
        });
    };
    Web3WalletService.prototype.getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.eth.getBalance(address, function (error, result) {
                            if (error) {
                                console.log(error);
                                return reject(false);
                            }
                            resolve(result.toNumber());
                        });
                    })];
            });
        });
    };
    Web3WalletService.prototype.isLocked = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentWallet()];
                    case 1: return [2 /*return*/, !(_a.sent())];
                }
            });
        });
    };
    Web3WalletService.prototype.isLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.local];
                }
            });
        });
    };
    Web3WalletService.prototype.unlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.isLocal()];
                    case 1:
                        _a = (_b.sent());
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.isLocked()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.localWallet.unlock()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [4 /*yield*/, this.isLocked()];
                    case 6: return [2 /*return*/, !(_b.sent())];
                }
            });
        });
    };
    // Network
    Web3WalletService.prototype.isSameNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isLocal()];
                    case 1:
                        if (_a.sent()) {
                            // Using local provider means we're on the same network
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, callback_to_promise_1.default(window.web3.version.getNetwork)];
                    case 2: 
                    // assume main network
                    return [2 /*return*/, ((_a.sent()) || 1) == this.config.client_network];
                }
            });
        });
    };
    // Bootstrap
    Web3WalletService.prototype.setUp = function () {
        this.ready() // boot web3 loading
            .catch(function (e) {
            console.error('[Web3WalletService]', e);
        });
    };
    Web3WalletService.prototype.ready = function () {
        var _this = this;
        if (!this._ready) {
            this._ready = new Promise(function (resolve, reject) {
                if (typeof window.web3 !== 'undefined') {
                    _this.loadFromWeb3();
                    return resolve(true);
                }
                _this.waitForWeb3(resolve, reject);
            });
        }
        return this._ready;
    };
    Web3WalletService.prototype.waitForWeb3 = function (resolve, reject) {
        var _this = this;
        this._web3LoadAttempt++;
        if (this._web3LoadAttempt > 3) {
            this.loadLocal();
            return resolve(true);
        }
        setTimeout(function () {
            if (typeof window.web3 !== 'undefined') {
                _this.loadFromWeb3();
                return resolve(true);
            }
            setTimeout(function () { return _this.waitForWeb3(resolve, reject); }, 0);
        }, 1000);
    };
    Web3WalletService.prototype.loadFromWeb3 = function () {
        this.EthJS = Eth;
        // MetaMask found
        this.eth = new Eth(window.web3.currentProvider);
        this.local = false;
    };
    Web3WalletService.prototype.loadLocal = function () {
        var _this = this;
        this.EthJS = Eth;
        // Non-metamask
        this.eth = new Eth(new SignerProvider(this.config.network_address, {
            signTransaction: function (rawTx, cb) { return _this.localWallet.signTransaction(rawTx, cb); },
            accounts: function (cb) { return _this.localWallet.accounts(cb); }
        }));
        this.local = true;
    };
    Web3WalletService.prototype.isUnavailable = function () {
        return this.unavailable;
    };
    // Contract Methods
    Web3WalletService.prototype.sendSignedContractMethodWithValue = function (contract, method, params, value, message, tokenDelta) {
        if (message === void 0) { message = ''; }
        if (tokenDelta === void 0) { tokenDelta = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var txHash, passedTxObject, txObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isLocal()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.localWallet.unlock()];
                    case 2:
                        _a.sent();
                        passedTxObject = __assign({ value: value }, contract.defaultTxObject);
                        if (!passedTxObject.gas) {
                            passedTxObject.gas = 300000; // TODO: estimate gas
                        }
                        return [4 /*yield*/, this.transactionOverlay.waitForLocalTxObject(passedTxObject, message, tokenDelta)];
                    case 3:
                        txObject = _a.sent();
                        return [4 /*yield*/, contract[method].apply(contract, params.concat([txObject]))];
                    case 4:
                        txHash = _a.sent();
                        this.localWallet.prune();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.transactionOverlay.waitForExternalTx(function () { return contract[method].apply(contract, params.concat([{ value: value }])); }, message)];
                    case 6:
                        txHash = _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, async_sleep_1.default(this.isLocal() ? 250 : 1000)];
                    case 8:
                        _a.sent(); // Modals "cooldown"
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    Web3WalletService.prototype.sendSignedContractMethod = function (contract, method, params, message, tokenDelta) {
        if (message === void 0) { message = ''; }
        if (tokenDelta === void 0) { tokenDelta = 0; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendSignedContractMethodWithValue(contract, method, params, 0, message, tokenDelta)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Normal Transactions
    Web3WalletService.prototype.sendTransaction = function (originalTxObject, message) {
        if (message === void 0) { message = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var txHash, txObject;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isLocal()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.localWallet.unlock()];
                    case 2:
                        _a.sent();
                        if (!originalTxObject.gas) {
                            originalTxObject.gas = 300000; // TODO: estimate gas
                        }
                        return [4 /*yield*/, this.transactionOverlay.waitForLocalTxObject(originalTxObject, message)];
                    case 3:
                        txObject = _a.sent();
                        return [4 /*yield*/, this.eth.sendTransaction(txObject)];
                    case 4:
                        txHash = _a.sent();
                        this.localWallet.prune();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.transactionOverlay.waitForExternalTx(function () { return _this.eth.sendTransaction(originalTxObject); }, message)];
                    case 6:
                        txHash = _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, async_sleep_1.default(this.isLocal() ? 250 : 1000)];
                    case 8:
                        _a.sent(); // Modals "cooldown"
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    // Provider
    Web3WalletService.prototype.getOnChainInterfaceLabel = function () {
        if (this.local) {
            return 'Private Key';
        }
        if (window.web3.currentProvider.constructor.name === 'MetamaskInpageProvider') {
            return 'Metamask';
        }
        else if (window.web3.currentProvider.constructor.name === 'EthereumProvider') {
            return 'Mist';
        }
        else if (window.web3.currentProvider.constructor.name === 'o') {
            return 'Parity';
        }
        return 'Local Interface';
    };
    // Service provider
    Web3WalletService._ = function (localWallet, transactionOverlay) {
        return new Web3WalletService_1(localWallet, transactionOverlay);
    };
    var Web3WalletService_1;
    Web3WalletService = Web3WalletService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [local_wallet_service_1.LocalWalletService,
            transaction_overlay_service_1.TransactionOverlayService])
    ], Web3WalletService);
    return Web3WalletService;
}());
exports.Web3WalletService = Web3WalletService;
//# sourceMappingURL=web3-wallet.service.js.map