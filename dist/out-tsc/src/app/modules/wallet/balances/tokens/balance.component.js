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
var client_1 = require("../../../../services/api/client");
var session_1 = require("../../../../services/session");
var web3_wallet_service_1 = require("../../../blockchain/web3-wallet.service");
var token_contract_service_1 = require("../../../blockchain/contracts/token-contract.service");
var WalletBalanceTokensComponent = /** @class */ (function () {
    function WalletBalanceTokensComponent(client, cd, web3Wallet, tokenContract, session) {
        this.client = client;
        this.cd = cd;
        this.web3Wallet = web3Wallet;
        this.tokenContract = tokenContract;
        this.session = session;
        this.inProgress = false;
        this.balance = 0;
        this.testnetBalance = 0;
        this.addresses = [];
        this.opspot = window.Opspot;
    }
    WalletBalanceTokensComponent.prototype.ngOnInit = function () {
        this.load();
    };
    WalletBalanceTokensComponent.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadRemote()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadLocal()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletBalanceTokensComponent.prototype.loadLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address, i, balance, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 1:
                        address = _a.sent();
                        if (!address)
                            return [2 /*return*/];
                        //check to see if this address is different to the receiver address
                        for (i = 0; i < this.addresses.length; i++) {
                            if (this.addresses[i].address == address) {
                                this.addresses[i].label = 'OnChain & Receiver';
                                this.detectChanges();
                                return [2 /*return*/]; //no need to count twice
                            }
                        }
                        return [4 /*yield*/, this.tokenContract.balanceOf(address)];
                    case 2:
                        balance = _a.sent();
                        this.balance = (new BN(this.balance)).add(balance[0]);
                        this.addresses.unshift({
                            'label': "OnChain",
                            'address': address,
                            'balance': balance[0].toString(),
                        });
                        this.detectChanges();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WalletBalanceTokensComponent.prototype.loadRemote = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        this.detectChanges();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.client.get("api/v2/blockchain/wallet/balance")];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            this.balance = response.balance;
                            this.testnetBalance = response.testnetBalance;
                            this.addresses = response.addresses;
                        }
                        else {
                            console.error('No data');
                            this.balance = 0;
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        this.balance = 0;
                        return [3 /*break*/, 5];
                    case 4:
                        this.inProgress = false;
                        this.detectChanges();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    WalletBalanceTokensComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    WalletBalanceTokensComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wallet--balance-tokens',
            templateUrl: 'balance.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef,
            web3_wallet_service_1.Web3WalletService,
            token_contract_service_1.TokenContractService,
            session_1.Session])
    ], WalletBalanceTokensComponent);
    return WalletBalanceTokensComponent;
}());
exports.WalletBalanceTokensComponent = WalletBalanceTokensComponent;
//# sourceMappingURL=balance.component.js.map