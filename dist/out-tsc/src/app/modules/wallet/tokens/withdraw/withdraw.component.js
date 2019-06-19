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
var client_1 = require("../../../../services/api/client");
var withdraw_contract_service_1 = require("../../../blockchain/contracts/withdraw-contract.service");
var session_1 = require("../../../../services/session");
var ledger_component_1 = require("./ledger/ledger.component");
var web3_wallet_service_1 = require("../../../blockchain/web3-wallet.service");
var WalletTokenWithdrawComponent = /** @class */ (function () {
    function WalletTokenWithdrawComponent(client, cd, session, contract, web3Wallet) {
        this.client = client;
        this.cd = cd;
        this.session = session;
        this.contract = contract;
        this.web3Wallet = web3Wallet;
        this.inProgress = false;
        this.balance = 0;
        this.available = 0;
        this.amount = 0;
        this.error = '';
        this.hasWithdrawnToday = false;
        this.withholding = 0;
    }
    WalletTokenWithdrawComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.load();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.checkPreviousWithdrawals()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.error = 'You can only withdraw once a day';
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WalletTokenWithdrawComponent.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        this.error = '';
                        this.detectChanges();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.client.get("api/v2/blockchain/wallet/balance")];
                    case 2:
                        response = _a.sent();
                        if (response && typeof response.addresses !== 'undefined') {
                            this.balance = response.addresses[1].balance / Math.pow(10, 18);
                            this.available = response.addresses[1].available / Math.pow(10, 18);
                            if (this.balance > this.available) {
                                this.withholding = this.balance - this.available;
                            }
                            this.setAmount(this.available);
                        }
                        else {
                            this.error = 'Server error';
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        this.error = (e_2 && e_2.message) || 'Server error';
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
    WalletTokenWithdrawComponent.prototype.checkPreviousWithdrawals = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post('api/v2/blockchain/transactions/can-withdraw')];
                    case 1:
                        response = _a.sent();
                        if (!response.canWithdraw) {
                            this.hasWithdrawnToday = true;
                            throw new Error('You can only withdraw once a day');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletTokenWithdrawComponent.prototype.setAmount = function (amount) {
        if (!amount) {
            this.amount = 0;
            return;
        }
        if (typeof amount === 'number') {
            this.amount = amount;
            this.detectChanges();
            return;
        }
        amount = amount.replace(/,/g, '');
        this.amount = parseFloat(amount);
        this.detectChanges();
    };
    WalletTokenWithdrawComponent.prototype.canWithdraw = function () {
        return !this.hasWithdrawnToday && !this.inProgress && this.amount > 0 && this.amount <= this.available;
    };
    WalletTokenWithdrawComponent.prototype.withdraw = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        this.error = '';
                        this.detectChanges();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, 10, 11]);
                        return [4 /*yield*/, this.checkPreviousWithdrawals()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.web3Wallet.ready()];
                    case 3:
                        _a.sent();
                        if (!this.web3Wallet.isUnavailable()) return [3 /*break*/, 4];
                        throw new Error('No Ethereum wallets available on your browser.');
                    case 4: return [4 /*yield*/, this.web3Wallet.unlock()];
                    case 5:
                        if (!(_a.sent())) {
                            throw new Error('Your Ethereum wallet is locked or connected to another network.');
                        }
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.contract.request(this.session.getLoggedInUser().guid, this.amount * Math.pow(10, 18))];
                    case 7:
                        result = _a.sent();
                        return [4 /*yield*/, this.client.post("api/v2/blockchain/transactions/withdraw", result)];
                    case 8:
                        response = _a.sent();
                        if (response.done) {
                            this.refresh();
                            this.ledgerComponent.prepend(response.entity);
                        }
                        else {
                            this.error = 'Server error';
                        }
                        return [3 /*break*/, 11];
                    case 9:
                        e_3 = _a.sent();
                        console.error(e_3);
                        this.error = (e_3 && e_3.message) || 'Server error';
                        return [3 /*break*/, 11];
                    case 10:
                        this.inProgress = false;
                        this.detectChanges();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    WalletTokenWithdrawComponent.prototype.refresh = function () {
        this.load();
    };
    WalletTokenWithdrawComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.ViewChild(ledger_component_1.WalletTokenWithdrawLedgerComponent),
        __metadata("design:type", ledger_component_1.WalletTokenWithdrawLedgerComponent)
    ], WalletTokenWithdrawComponent.prototype, "ledgerComponent", void 0);
    WalletTokenWithdrawComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wallet-token--withdraw',
            templateUrl: 'withdraw.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef,
            session_1.Session,
            withdraw_contract_service_1.WithdrawContractService,
            web3_wallet_service_1.Web3WalletService])
    ], WalletTokenWithdrawComponent);
    return WalletTokenWithdrawComponent;
}());
exports.WalletTokenWithdrawComponent = WalletTokenWithdrawComponent;
//# sourceMappingURL=withdraw.component.js.map