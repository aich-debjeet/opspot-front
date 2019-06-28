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
var common_1 = require("@angular/common");
var web3_wallet_service_1 = require("../../../blockchain/web3-wallet.service");
var client_1 = require("../../../../services/api/client");
var token_contract_service_1 = require("../../../blockchain/contracts/token-contract.service");
var overlay_modal_1 = require("../../../../services/ux/overlay-modal");
var router_1 = require("@angular/router");
var BoostCreatorPaymentMethodsComponent = /** @class */ (function () {
    function BoostCreatorPaymentMethodsComponent(_changeDetectorRef, web3Wallet, client, tokenContract, overlayService, router) {
        this._changeDetectorRef = _changeDetectorRef;
        this.web3Wallet = web3Wallet;
        this.client = client;
        this.tokenContract = tokenContract;
        this.overlayService = overlayService;
        this.router = router;
        this.opspot = window.Opspot;
        this.boostChanged = new core_1.EventEmitter();
        this.rates = {
            rate: 1,
            min: 250,
            cap: 5000,
            usd: 1000,
            tokens: 1000,
            minUsd: 1,
            priority: 1,
            maxCategories: 3
        };
        this.balances = {
            onchain: null,
            offchain: null,
            onChainAddress: '',
            isReceiverOnchain: false,
        };
    }
    BoostCreatorPaymentMethodsComponent.prototype.ngOnInit = function () {
        this.loadBalances();
    };
    BoostCreatorPaymentMethodsComponent.prototype.loadBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentWallet, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 1:
                        currentWallet = _a.sent();
                        if (currentWallet) {
                            this.loadCurrentWalletBalance(currentWallet);
                        }
                        return [4 /*yield*/, this.client.get("api/v2/blockchain/wallet/balance")];
                    case 2:
                        response = _a.sent();
                        if (!response) {
                            return [2 /*return*/];
                        }
                        this.balances.offchain = response.addresses[1].balance;
                        if (!currentWallet) {
                            this.balances.onchain = response.addresses[0].balance;
                            this.balances.onChainAddress = response.addresses[0].address;
                            this.balances.isReceiverOnchain = true;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BoostCreatorPaymentMethodsComponent.prototype.loadCurrentWalletBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var balance, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.balances.onChainAddress = address;
                        this.balances.isReceiverOnchain = false;
                        return [4 /*yield*/, this.tokenContract.balanceOf(address)];
                    case 1:
                        balance = _a.sent();
                        this.balances.onchain = balance[0].toString();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sets the boost currency, and rounds the amount if necessary
     */
    BoostCreatorPaymentMethodsComponent.prototype.setBoostCurrency = function (currency) {
        if (this.boost.currency === currency) {
            return;
        }
        this.boost.currency = currency;
        localStorage.setItem('preferred-payment-method', currency);
        this.boost.nonce = null;
        this.roundAmount();
    };
    /**
     * Round by 2 decimals if P2P and currency is unset or usd. If not, round by 4 decimals.
     */
    BoostCreatorPaymentMethodsComponent.prototype.roundAmount = function () {
        if ((this.boost.type === 'p2p') && (!this.boost.currency || (this.boost.currency === 'usd'))) {
            this.boost.amount = Math.round(parseFloat("" + this.boost.amount) * 100) / 100;
        }
        else if (this.boost.currency === 'tokens' || this.boost.currency === 'offchain') {
            this.boost.amount = Math.round(parseFloat("" + this.boost.amount) * 10000) / 10000;
        }
    };
    // Charge and rates
    /**
     * Calculates base charges (not including priority or any other % based fee)
     */
    BoostCreatorPaymentMethodsComponent.prototype.calcBaseCharges = function (type) {
        // P2P should just round down amount points. It's bid based.
        if (this.boost.type === 'p2p') {
            return this.boost.amount;
        }
        var tokensFixRate = this.rates.tokens / 10000;
        // Non-P2P should do the views <-> currency conversion
        switch (type) {
            case 'usd':
                var usdFixRate = this.rates.usd / 100;
                return Math.ceil(this.boost.amount / usdFixRate) / 100;
            case 'offchain':
            case 'tokens':
                return Math.ceil(this.boost.amount / tokensFixRate) / 10000;
        }
        throw new Error('Unknown currency');
    };
    /**
     * Calculate charges including priority
     */
    BoostCreatorPaymentMethodsComponent.prototype.calcCharges = function (type) {
        var charges = this.calcBaseCharges(type);
        return charges + (charges * this.getPriorityRate());
    };
    /**
     * Calculate priority charges (for its preview)
     */
    BoostCreatorPaymentMethodsComponent.prototype.calcPriorityChargesPreview = function (type) {
        return this.calcBaseCharges(type) * this.getPriorityRate(true);
    };
    /**
     * Gets the priority rate, only if applicable
     */
    BoostCreatorPaymentMethodsComponent.prototype.getPriorityRate = function (force) {
        // NOTE: No priority on P2P
        if (force || (this.boost.type !== 'p2p' && this.boost.priority)) {
            return this.rates.priority;
        }
        return 0;
    };
    BoostCreatorPaymentMethodsComponent.prototype.getOnChainInterfaceLabel = function () {
        return this.web3Wallet.getOnChainInterfaceLabel();
    };
    BoostCreatorPaymentMethodsComponent.prototype.buyTokens = function () {
        this.overlayService.dismiss();
        this.router.navigate(['/token']);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostCreatorPaymentMethodsComponent.prototype, "boost", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], BoostCreatorPaymentMethodsComponent.prototype, "boostChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostCreatorPaymentMethodsComponent.prototype, "rates", void 0);
    BoostCreatorPaymentMethodsComponent = __decorate([
        core_1.Component({
            providers: [common_1.CurrencyPipe],
            selector: 'm-boost--creator-payment-methods',
            templateUrl: 'payment-methods.component.html'
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            web3_wallet_service_1.Web3WalletService,
            client_1.Client,
            token_contract_service_1.TokenContractService,
            overlay_modal_1.OverlayModalService,
            router_1.Router])
    ], BoostCreatorPaymentMethodsComponent);
    return BoostCreatorPaymentMethodsComponent;
}());
exports.BoostCreatorPaymentMethodsComponent = BoostCreatorPaymentMethodsComponent;
//# sourceMappingURL=payment-methods.component.js.map