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
var BN = require("bn.js");
var web3_wallet_service_1 = require("../web3-wallet.service");
var WithdrawContractService = /** @class */ (function () {
    function WithdrawContractService(web3Wallet) {
        this.web3Wallet = web3Wallet;
        this.load();
    }
    WithdrawContractService_1 = WithdrawContractService;
    WithdrawContractService.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3Wallet.ready()];
                    case 1:
                        _a.sent();
                        this.instance = this.web3Wallet.eth.contract(this.web3Wallet.config.withdraw.abi, '0x')
                            .at(this.web3Wallet.config.withdraw.address);
                        this.contract();
                        return [2 /*return*/];
                }
            });
        });
    };
    WithdrawContractService.prototype.contract = function (gasPriceGwei) {
        if (gasPriceGwei === void 0) { gasPriceGwei = this.web3Wallet.config.default_gas_price || 1; }
        return __awaiter(this, void 0, void 0, function () {
            var wallet, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.instance) {
                            throw new Error('No withdraw instance');
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
    // Withdraw
    WithdrawContractService.prototype.request = function (guid, amount, message) {
        if (message === void 0) { message = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var tokens, gasLimit, gas, gasEther, tx, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.contract()];
                    case 1:
                        _d.sent(); //wait for instance to get correct info
                        tokens = amount / (Math.pow(10, 18));
                        gasLimit = 67839;
                        gas = (new BN(this.instance.defaultTxObject.gasPrice)).mul(new BN(gasLimit));
                        gasEther = this.web3Wallet.EthJS.fromWei(gas, 'ether');
                        _b = (_a = this.web3Wallet).sendSignedContractMethodWithValue;
                        return [4 /*yield*/, this.contract()];
                    case 2: return [4 /*yield*/, _b.apply(_a, [_d.sent(),
                            'request',
                            [
                                guid,
                                amount
                            ],
                            gas.clone(),
                            ("Request a withdrawal of " + tokens + " Opspot Tokens. " + gasEther + " ETH will be transferred to cover the gas fee. If you send a low amount of gas fee, your withdrawal may fail. " + message).trim()])];
                    case 3:
                        tx = _d.sent();
                        _c = {};
                        return [4 /*yield*/, this.contract()];
                    case 4: return [2 /*return*/, (_c.address = (_d.sent()).defaultTxObject.from,
                            _c.guid = guid,
                            _c.amount = amount.toString(),
                            _c.gas = gas.toString(),
                            _c.tx = tx,
                            _c)];
                }
            });
        });
    };
    // Service provider
    WithdrawContractService._ = function (web3Wallet) {
        return new WithdrawContractService_1(web3Wallet);
    };
    var WithdrawContractService_1;
    WithdrawContractService = WithdrawContractService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [web3_wallet_service_1.Web3WalletService])
    ], WithdrawContractService);
    return WithdrawContractService;
}());
exports.WithdrawContractService = WithdrawContractService;
//# sourceMappingURL=withdraw-contract.service.js.map