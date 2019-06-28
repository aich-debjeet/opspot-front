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
var session_1 = require("../../../../services/session");
var client_1 = require("../../../../services/api/client");
var token_contract_service_1 = require("../../../blockchain/contracts/token-contract.service");
var web3_wallet_service_1 = require("../../../blockchain/web3-wallet.service");
var BN = require("bn.js");
var WalletTokenTestnetComponent = /** @class */ (function () {
    function WalletTokenTestnetComponent(session, client, cd, token, web3Wallet) {
        this.session = session;
        this.client = client;
        this.cd = cd;
        this.token = token;
        this.web3Wallet = web3Wallet;
        this.offchainBalance = 0;
        this.inProgress = false;
        this.address = "";
        this.user = window.Opspot.user;
        this.loadBalance();
    }
    WalletTokenTestnetComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.savedConfig = Object.assign({}, window.Opspot.blockchain);
                        window.Opspot.blockchain.client_network = 4; //rinkeby
                        window.Opspot.blockchain.token.address = '0xf5f7ad7d2c37cae59207af43d0beb4b361fb9ec8';
                        window.Opspot.blockchain.network_address = 'https://rinkeby.infura.io/';
                        this.web3Wallet.config = window.Opspot.blockchain;
                        return [4 /*yield*/, this.web3Wallet.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 2:
                        wallet = _a.sent();
                        if (wallet)
                            this.address = wallet;
                        return [4 /*yield*/, this.token.load()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.checkWallet()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        this.error = err_1;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    WalletTokenTestnetComponent.prototype.checkWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.web3Wallet.isUnavailable()) return [3 /*break*/, 1];
                        throw 'No Ethereum wallets available on your browser.';
                    case 1: return [4 /*yield*/, this.web3Wallet.unlock()];
                    case 2:
                        if (!(_a.sent())) {
                            throw 'Your Ethereum wallet is locked or connected to another network. Ensure you are on the Rinkeby Network.';
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WalletTokenTestnetComponent.prototype.loadBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.client.get("api/v2/blockchain/wallet/balance")];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            this.offchainBalance = response.addresses[1].balance;
                        }
                        else {
                            console.error('No data');
                            this.offchainBalance = 0;
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        this.offchainBalance = 0;
                        return [3 /*break*/, 5];
                    case 4:
                        this.inProgress = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    WalletTokenTestnetComponent.prototype.transfer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, balanceOf, txHash, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        return [4 /*yield*/, this.web3Wallet.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 2:
                        wallet = _a.sent();
                        if (wallet)
                            this.address = wallet;
                        return [4 /*yield*/, this.token.token()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 8, , 9]);
                        return [4 /*yield*/, this.token.balanceOf(this.address)];
                    case 5:
                        balanceOf = _a.sent();
                        if (balanceOf.balance.lte(new BN(0))) {
                            throw "You do not have any tokens to transfer. If you have already made a transfer please allow 7 days.";
                        }
                        return [4 /*yield*/, this.token.token()];
                    case 6: return [4 /*yield*/, (_a.sent()).transfer('0x461f1c5768cdb7e567a84e22b19db0eaba069bad', balanceOf.balance, {
                            gas: 67839
                        })];
                    case 7:
                        txHash = _a.sent();
                        alert('Completed. Please see tx: ' + txHash);
                        return [3 /*break*/, 9];
                    case 8:
                        err_2 = _a.sent();
                        this.error = err_2;
                        this.inProgress = false;
                        return [2 /*return*/];
                    case 9:
                        this.inProgress = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletTokenTestnetComponent.prototype.ngOnDestroy = function () {
        window.Opspot.blockchain = this.savedConfig;
    };
    WalletTokenTestnetComponent = __decorate([
        core_1.Component({
            selector: 'm-wallet-token--testnet',
            templateUrl: 'testnet.component.html',
        }),
        __metadata("design:paramtypes", [session_1.Session,
            client_1.Client,
            core_1.ChangeDetectorRef,
            token_contract_service_1.TokenContractService,
            web3_wallet_service_1.Web3WalletService])
    ], WalletTokenTestnetComponent);
    return WalletTokenTestnetComponent;
}());
exports.WalletTokenTestnetComponent = WalletTokenTestnetComponent;
//# sourceMappingURL=testnet.component.js.map