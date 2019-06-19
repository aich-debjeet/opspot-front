"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var wire_service_1 = require("../wire.service");
var web3_wallet_service_1 = require("../../blockchain/web3-wallet.service");
var token_contract_service_1 = require("../../blockchain/contracts/token-contract.service");
var router_1 = require("@angular/router");
var VisibleWireError = /** @class */ (function (_super) {
    __extends(VisibleWireError, _super);
    function VisibleWireError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.visible = true;
        return _this;
    }
    return VisibleWireError;
}(Error));
exports.VisibleWireError = VisibleWireError;
var WirePaymentsCreatorComponent = /** @class */ (function () {
    function WirePaymentsCreatorComponent(session, wireService, cd, overlayModal, client, currency, web3Wallet, tokenContract, router) {
        this.session = session;
        this.wireService = wireService;
        this.cd = cd;
        this.overlayModal = overlayModal;
        this.client = client;
        this.currency = currency;
        this.web3Wallet = web3Wallet;
        this.tokenContract = tokenContract;
        this.router = router;
        this.opspot = window.Opspot;
        this.blockchain = window.Opspot.blockchain;
        this.wire = {
            amount: 1,
            payloadType: 'onchain',
            guid: null,
            recurring: false,
            payload: null,
            period: null
        };
        this.rates = {
            balance: null,
            rate: 1,
            min: 250,
            cap: 5000,
            usd: 1,
            tokens: 1,
        };
        this.editingAmount = false;
        this.initialized = false;
        this.inProgress = false;
        this.success = false;
        this.criticalError = false;
        this.error = '';
        this.defaultAmount = this.wire.amount;
        this.balances = {
            onchain: null,
            offchain: null,
            onChainAddress: '',
            isReceiverOnchain: false,
            wireCap: null
        };
    }
    Object.defineProperty(WirePaymentsCreatorComponent.prototype, "data", {
        set: function (payment) {
            this.wire.amount = payment.amount;
            this.wire.period = payment.period;
            this.wire.recurring = true;
            this.wire.guid = payment.entity_guid;
            this.receiver = payment.receiver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WirePaymentsCreatorComponent.prototype, "opts", {
        set: function (opts) {
            this._opts = opts;
            this.setDefaults();
        },
        enumerable: true,
        configurable: true
    });
    WirePaymentsCreatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.load()
            .then(function () {
            _this.initialized = true;
        });
        this.loadBalances();
        this.loadTokenRate();
    };
    WirePaymentsCreatorComponent.prototype.loadBalances = function () {
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
                        this.balances.wireCap = response.wireCap;
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
    WirePaymentsCreatorComponent.prototype.loadCurrentWalletBalance = function (address) {
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
    WirePaymentsCreatorComponent.prototype.loadTokenRate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.get("api/v2/blockchain/rate/tokens")];
                    case 1:
                        response = _a.sent();
                        if (response && response.rate) {
                            this.tokenRate = response.rate;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Load settings
    /**
     * Loads wire settings from server (using Boost rates)
     */
    WirePaymentsCreatorComponent.prototype.load = function () {
        var _this = this;
        this.inProgress = true;
        return this.client.get("api/v2/boost/rates")
            .then(function (rates) {
            _this.inProgress = false;
            _this.rates = rates;
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.criticalError = true;
            _this.error = 'Internal server error';
        });
    };
    WirePaymentsCreatorComponent.prototype.setDefaults = function () {
        this.wire.recurring = false;
        var payloadType = localStorage.getItem('preferred-payment-method');
        if (['onchain', 'offchain'].indexOf(payloadType) === -1) {
            payloadType = 'offchain';
        }
        this.setPayloadType(payloadType);
    };
    // General
    /**
     * Sets the wire currency
     */
    WirePaymentsCreatorComponent.prototype.setPayloadType = function (payloadType) {
        this.wire.payloadType = payloadType;
        this.wire.payload = null;
        if (payloadType === 'onchain') {
            this.setOnchainNoncePayload('');
        }
        localStorage.setItem('preferred-payment-method', payloadType);
        this.roundAmount();
        this.showErrors();
    };
    /**
     * Sets the wire payment nonce
     */
    WirePaymentsCreatorComponent.prototype.setNoncePayload = function (nonce) {
        this.wire.payload = nonce;
        this.showErrors();
    };
    /**
     * Sets the onchain specific wire payment nonce
     */
    WirePaymentsCreatorComponent.prototype.setOnchainNoncePayload = function (address) {
        return this.setNoncePayload({ receiver: this.receiver, address: address });
    };
    /**
    * Round by 4
    */
    WirePaymentsCreatorComponent.prototype.roundAmount = function () {
        this.wire.amount = Math.round(parseFloat("" + this.wire.amount) * 10000) / 10000;
    };
    // Charge and rates
    /**
     * Calculates base charges (any other % based fee)
     */
    WirePaymentsCreatorComponent.prototype.calcBaseCharges = function (type) {
        // NOTE: Can be used to calculate fees
        return this.wire.amount;
    };
    /**
     * Calculate charges including priority
     */
    WirePaymentsCreatorComponent.prototype.calcCharges = function (type) {
        // NOTE: Can be used to calculate bonuses
        return this.calcBaseCharges(type);
    };
    // Rate preview
    WirePaymentsCreatorComponent.prototype.getTokenAmountRate = function (amount) {
        if (!this.tokenRate) {
            return 0;
        }
        return amount * this.tokenRate;
    };
    /**
     * Toggles the recurring subscription based on its current status
     */
    WirePaymentsCreatorComponent.prototype.toggleRecurring = function () {
        this.wire.recurring = !this.wire.recurring;
        this.showErrors();
    };
    /**
     * Validates if the wire payment can be submitted using the current settings
     */
    WirePaymentsCreatorComponent.prototype.validate = function () {
        if (this.wire.amount <= 0) {
            throw new Error('Amount should be greater than zero.');
        }
        if (!this.wire.payloadType) {
            throw new Error('You should select a payment method.');
        }
        switch (this.wire.payloadType) {
            case 'onchain':
                if (!this.wire.payload && !this.wire.payload.receiver) {
                    throw new Error('Invalid receiver.');
                }
                break;
            case 'offchain':
                if (this.balances.wireCap === null) {
                    // Skip client-side check until loaded
                    break;
                }
                var wireCap = this.balances.wireCap / Math.pow(10, 18), balance = this.balances.offchain / Math.pow(10, 18);
                if (this.wire.amount > wireCap) {
                    throw new VisibleWireError("You cannot spend more than " + wireCap + " tokens today.");
                }
                else if (this.wire.amount > balance) {
                    throw new VisibleWireError("You cannot spend more than " + balance + " tokens.");
                }
                break;
        }
        if (!this.wire.guid) {
            throw new Error('You cannot wire this.');
        }
    };
    /**
     * Checks if the user can submit using the current settings
     */
    WirePaymentsCreatorComponent.prototype.canSubmit = function () {
        try {
            this.validate();
            return true;
        }
        catch (e) {
            // console.log(`Invalid wire: ${e.visible ? '[USERFACING] ' : ''}${e.message}`);
        }
        return false;
    };
    /**
     * Shows visible wire errors
     */
    WirePaymentsCreatorComponent.prototype.showErrors = function () {
        if (!this.submitted) {
            this.error = '';
        }
        try {
            this.validate();
        }
        catch (e) {
            if (e.visible) {
                this.error = e.message;
            }
        }
    };
    WirePaymentsCreatorComponent.prototype.buyTokens = function () {
        this.overlayModal.dismiss();
        this.router.navigate(['/token']);
    };
    /**
     * Submits the wire payment
     */
    WirePaymentsCreatorComponent.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var done, e_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.inProgress) {
                            return [2 /*return*/];
                        }
                        if (!this.canSubmit()) {
                            this.showErrors();
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.inProgress = true;
                        this.submitted = true;
                        this.error = '';
                        return [4 /*yield*/, this.wireService.submitWire(this.wire)];
                    case 2:
                        done = (_a.sent()).done;
                        if (done) {
                            this.success = true;
                            if (this._opts && this._opts.onComplete) {
                                this._opts.onComplete(this.wire);
                            }
                            setTimeout(function () {
                                _this.overlayModal.dismiss();
                            }, 2500);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        e_3 = _a.sent();
                        this.error = (e_3 && e_3.message) || 'Sorry, something went wrong';
                        return [3 /*break*/, 5];
                    case 4:
                        this.inProgress = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WirePaymentsCreatorComponent.prototype, "receiver", void 0);
    __decorate([
        core_1.Input('payment'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WirePaymentsCreatorComponent.prototype, "data", null);
    WirePaymentsCreatorComponent = __decorate([
        core_1.Component({
            providers: [common_1.CurrencyPipe],
            selector: 'm-wire-payments--creator',
            templateUrl: 'creator.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            wire_service_1.WireService,
            core_1.ChangeDetectorRef,
            overlay_modal_1.OverlayModalService,
            api_1.Client,
            common_1.CurrencyPipe,
            web3_wallet_service_1.Web3WalletService,
            token_contract_service_1.TokenContractService,
            router_1.Router])
    ], WirePaymentsCreatorComponent);
    return WirePaymentsCreatorComponent;
}());
exports.WirePaymentsCreatorComponent = WirePaymentsCreatorComponent;
//# sourceMappingURL=creator.component.js.map