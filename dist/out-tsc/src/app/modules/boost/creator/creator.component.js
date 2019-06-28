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
var common_1 = require("@angular/common");
var BN = require("bn.js");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var token_contract_service_1 = require("../../blockchain/contracts/token-contract.service");
var boost_contract_service_1 = require("../../blockchain/contracts/boost-contract.service");
var web3_wallet_service_1 = require("../../blockchain/web3-wallet.service");
var offchain_payment_service_1 = require("../../blockchain/offchain-payment.service");
var VisibleBoostError = /** @class */ (function (_super) {
    __extends(VisibleBoostError, _super);
    function VisibleBoostError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.visible = true;
        return _this;
    }
    return VisibleBoostError;
}(Error));
exports.VisibleBoostError = VisibleBoostError;
var BoostCreatorComponent = /** @class */ (function () {
    function BoostCreatorComponent(session, _changeDetectorRef, overlayModal, client, currency, tokensContract, boostContract, web3Wallet, offchainPayment) {
        this.session = session;
        this._changeDetectorRef = _changeDetectorRef;
        this.overlayModal = overlayModal;
        this.client = client;
        this.currency = currency;
        this.tokensContract = tokensContract;
        this.boostContract = boostContract;
        this.web3Wallet = web3Wallet;
        this.offchainPayment = offchainPayment;
        this.object = {};
        this.boost = {
            amount: 1000,
            currency: 'offchain',
            type: null,
            // General
            categories: [],
            priority: false,
            // P2P
            target: null,
            postToFacebook: false,
            scheduledTs: null,
            // Payment
            nonce: null,
            checksum: null
        };
        this.allowedTypes = {};
        this.categories = [];
        this.rates = {
            balance: null,
            rate: 1,
            min: 250,
            cap: 5000,
            usd: 1000,
            tokens: 1000,
            minUsd: 1,
            priority: 1,
            maxCategories: 3
        };
        this.step = 0;
        this.estimatedTime = -1;
        this.editingAmount = false;
        this.editingTarget = false;
        this.inProgress = false;
        this.initialized = false;
        this.success = false;
        this.criticalError = false;
        this.error = '';
        this.wasAmountChanged = false;
        this.defaultAmount = this.boost.amount;
    }
    Object.defineProperty(BoostCreatorComponent.prototype, "data", {
        set: function (object) {
            this.object = object;
        },
        enumerable: true,
        configurable: true
    });
    BoostCreatorComponent.prototype.ngOnInit = function () {
        this.getPreferredPaymentMethod();
        this.load();
    };
    BoostCreatorComponent.prototype.ngAfterViewInit = function () {
        this.syncAllowedTypes();
    };
    BoostCreatorComponent.prototype.getPreferredPaymentMethod = function () {
        var currency = localStorage.getItem('preferred-payment-method');
        if (currency === 'creditcard') {
            currency = 'usd';
        }
        if (['offchain', 'usd', 'onchain'].indexOf(currency) !== -1)
            this.boost.currency = (currency ? currency : 'offchain');
        else {
            this.boost.currency = 'offchain';
        }
    };
    // Load settings
    /**
     * Loads boost settings from server
     */
    BoostCreatorComponent.prototype.load = function () {
        var _this = this;
        // TODO: Move to service and cache (maybe?)
        this.inProgress = true;
        return this.client.get("api/v2/boost/rates")
            .then(function (rates) {
            _this.inProgress = false;
            _this.rates = rates;
            // TODO: Implement in backend and remove below
            _this.rates = __assign({ maxCategories: 3 }, _this.rates);
            _this.calcEstimatedCompletionTime();
            //
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.criticalError = true;
            _this.error = 'Internal server error';
        });
    };
    // General
    /**
     * Enables and disables types based on the current object
     */
    BoostCreatorComponent.prototype.syncAllowedTypes = function () {
        if (!this.object || !this.object.type) {
            this.allowedTypes = {};
            this.boost.type = null;
            return;
        }
        switch (this.object.type) {
            case 'activity':
                this.allowedTypes = {
                    newsfeed: true,
                    p2p: true
                };
                this.boost.type = 'newsfeed';
                break;
            default:
                this.allowedTypes = {
                    content: true
                };
                this.boost.type = 'content';
                break;
        }
    };
    /**
     * Sets the boost type
     */
    BoostCreatorComponent.prototype.setBoostType = function (type) {
        this.boost.type = type;
        this.roundAmount();
        this.calcEstimatedCompletionTime();
        this.showErrors(true);
        if (type === 'p2p' && this.boost.currency === 'usd') {
            this.setBoostCurrency('creditcard');
        }
        else if (type !== 'p2p' && this.boost.currency === 'creditcard') {
            this.setBoostCurrency('usd');
        }
    };
    /**
     * Sets the boost currency, and rounds the amount if necessary
     */
    BoostCreatorComponent.prototype.setBoostCurrency = function (currency) {
        if (this.boost.currency === currency) {
            return;
        }
        this.boost.currency = currency;
        this.boost.nonce = null;
        this.roundAmount();
        this.showErrors(true);
    };
    /**
     * Sets the boost payment nonce
     */
    BoostCreatorComponent.prototype.setBoostNonce = function (nonce) {
        this.boost.nonce = nonce;
        this.showErrors();
    };
    // Read and edit amount
    /**
     * Activates and sets focus on amount editor
     */
    BoostCreatorComponent.prototype.amountEditorFocus = function () {
        this.editingAmount = true;
        if (!this.boost.amount || !this.wasAmountChanged) {
            this.boost.amount = '';
        }
        this._changeDetectorRef.detectChanges();
    };
    BoostCreatorComponent.prototype.setBoostAmount = function (amount) {
        this.wasAmountChanged = true;
        if (!amount) {
            this.boost.amount = 0;
            return;
        }
        amount = amount.replace(/,/g, '');
        if (this.boost.type !== 'p2p') {
            this.boost.amount = parseInt(amount);
        }
        else {
            this.boost.amount = parseFloat(amount);
        }
        this.calcEstimatedCompletionTime(true);
    };
    /**
     * Deactivates amount editor and post-process its value
     */
    BoostCreatorComponent.prototype.amountEditorBlur = function () {
        this.editingAmount = false;
        if (!this.wasAmountChanged) {
            this.boost.amount = this.defaultAmount;
            return;
        }
        if (!this.boost.amount) {
            this.boost.amount = 0;
        }
        if (this.boost.amount < 0) {
            this.boost.amount = 0;
        }
        this.roundAmount();
        this.showErrors(true);
    };
    /**
     * Round by 2 decimals if P2P and currency is unset or usd. If not, round by 4 decimals.
     */
    BoostCreatorComponent.prototype.roundAmount = function () {
        if (this.boost.currency === 'usd') {
            this.boost.amount = Math.round(parseFloat("" + this.boost.amount) * 100) / 100;
        }
        else {
            this.boost.amount = Math.round(parseFloat("" + this.boost.amount) * 10000) / 10000;
        }
    };
    /**
     * Calculates estimated completion time based on the current boosts backlog and the inputted amount
     */
    BoostCreatorComponent.prototype.calcEstimatedCompletionTime = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.boost.type !== 'p2p') {
            if (this.estimatedTime === -1 || refresh) {
                this.client.get('api/v2/boost/estimated', { impressions: this.boost.amount }).then(function (res) {
                    _this.estimatedTime = res.average || -1;
                });
            }
        }
        else {
            this.estimatedTime = -1;
        }
    };
    // Charge and rates
    /**
     * Calculates base charges (not including priority or any other % based fee)
     */
    BoostCreatorComponent.prototype.calcBaseCharges = function (type) {
        // P2P is bid based.
        if (this.boost.type === 'p2p') {
            return this.boost.amount;
        }
        // Non-P2P should do the views <-> currency conversion
        switch (type) {
            case 'usd':
                var usdFixRate = this.rates.usd / 100;
                return Math.ceil(this.boost.amount / usdFixRate) / 100;
            default:
                var tokensFixRate = this.rates.tokens / 10000;
                return Math.ceil(this.boost.amount / tokensFixRate) / 10000;
        }
    };
    /**
     * Calculate charges including priority
     */
    BoostCreatorComponent.prototype.calcCharges = function (type) {
        var charges = this.calcBaseCharges(type);
        return charges + (charges * this.getPriorityRate());
    };
    /**
     * Calculate priority charges (for its preview)
     */
    BoostCreatorComponent.prototype.calcPriorityChargesPreview = function (type) {
        return this.calcBaseCharges(type) * this.getPriorityRate(true);
    };
    /**
     * Gets the priority rate, only if applicable
     */
    BoostCreatorComponent.prototype.getPriorityRate = function (force) {
        // NOTE: No priority on P2P
        if (force || (this.boost.type !== 'p2p' && this.boost.priority)) {
            return this.rates.priority;
        }
        return 0;
    };
    // Categories
    /**
     * Toggles a category based on its current status
     */
    BoostCreatorComponent.prototype.toggleCategory = function (id) {
        if (this.hasCategory(id)) {
            this.boost.categories.splice(this.boost.categories.indexOf(id), 1);
        }
        else {
            if (this.boost.categories.length >= this.rates.maxCategories) {
                return;
            }
            this.boost.categories.push(id);
        }
    };
    /**
     * Checks if a category is toggled
     */
    BoostCreatorComponent.prototype.hasCategory = function (id) {
        return this.boost.categories.indexOf(id) > -1;
    };
    // Priority
    /**
     * Toggles the priority based on its current status
     */
    BoostCreatorComponent.prototype.togglePriority = function () {
        this.boost.priority = !this.boost.priority;
        this.showErrors(true);
    };
    // Read and edit target
    BoostCreatorComponent.prototype.setBoostTarget = function () {
        this.showErrors(true);
    };
    // Submit
    /**
     * Validates if the boost can be submitted using the current settings
     */
    BoostCreatorComponent.prototype.validateBoost = function () {
        if (this.boost.amount <= 0) {
            throw new Error('Amount should be greater than zero.');
        }
        if (!this.boost.currency) {
            throw new Error('You should select a currency.');
        }
        if (!this.boost.type) {
            throw new Error('You should select a type.');
        }
        switch (this.boost.currency) {
            case 'usd':
                if (!this.boost.nonce) {
                    throw new Error('Payment method not processed.');
                }
                if (this.calcCharges(this.boost.currency) < this.rates.minUsd) {
                    throw new VisibleBoostError("You must spend at least " + this.currency.transform(this.rates.minUsd, 'USD', true) + " USD");
                }
                break;
        }
        if (this.boost.priority && this.boost.currency !== 'usd') {
            throw new VisibleBoostError('The only supported payment method for priority boosts is credit card');
        }
        if (this.boost.type === 'p2p') {
            if (!this.boost.target) {
                throw new Error('You should select a target.');
            }
            if (this.boost.target.guid === this.session.getLoggedInUser().guid) {
                throw new VisibleBoostError('You cannot boost to yourself.');
            }
            if (this.boost.currency === 'onchain' && !this.boost.target.eth_wallet) {
                throw new VisibleBoostError('Boost target should have a Receiver Address.');
            }
            if ((this.boost.currency === 'offchain' || this.boost.currency === 'creditcard') && !this.boost.target.rewards) {
                throw new VisibleBoostError('Boost target should participate in the Rewards program.');
            }
        }
        else {
            if (this.boost.amount < this.rates.min || this.boost.amount > this.rates.cap) {
                throw new VisibleBoostError("You must boost between " + this.rates.min + " and " + this.rates.cap + " views.");
            }
            //if (!this.boost.categories.length) {
            //  throw new Error('You should select a category.');
            //}
        }
    };
    /**
     * Checks if the user can submit using the current settings
     */
    BoostCreatorComponent.prototype.canSubmit = function () {
        try {
            this.validateBoost();
            return true;
        }
        catch (e) {
            // console.log(`Invalid boost: ${e.visible ? '[USERFACING] ' : ''}${e.message}`);
        }
        return false;
    };
    /**
     * Shows visible boost errors
     */
    BoostCreatorComponent.prototype.showErrors = function (reset) {
        if (reset === void 0) { reset = false; }
        if (reset) {
            this.error = '';
        }
        try {
            this.validateBoost();
        }
        catch (e) {
            if (e.visible) {
                this.error = e.message;
            }
        }
    };
    BoostCreatorComponent.prototype.next = function () {
        this.step++;
    };
    BoostCreatorComponent.prototype.back = function () {
        this.step--;
    };
    /**
     * Submits the boost to the appropiate server endpoint using the current settings
     */
    BoostCreatorComponent.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var guid, prepared, _a, tokensFixRate, amount, _b, _c, tokenDec, bid, _d, _e, _f, e_1;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.error = '';
                        if (this.inProgress) {
                            return [2 /*return*/];
                        }
                        if (!this.canSubmit()) {
                            this.showErrors(true);
                            return [2 /*return*/];
                        }
                        this.inProgress = true;
                        guid = null;
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 27, 28, 29]);
                        if (!(this.boost.currency !== 'usd')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.prepare(this.object.guid)];
                    case 2:
                        prepared = _g.sent();
                        guid = prepared.guid;
                        this.boost.checksum = prepared.checksum;
                        _g.label = 3;
                    case 3:
                        if (!(this.boost.type !== 'p2p')) return [3 /*break*/, 14];
                        _a = this.boost.currency;
                        switch (_a) {
                            case 'onchain': return [3 /*break*/, 4];
                            case 'offchain': return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 12];
                    case 4: return [4 /*yield*/, this.web3Wallet.ready()];
                    case 5:
                        _g.sent();
                        tokensFixRate = this.rates.tokens / 10000;
                        amount = Math.ceil(this.boost.amount / tokensFixRate) / 10000;
                        if (!this.web3Wallet.isUnavailable()) return [3 /*break*/, 6];
                        throw new Error('No Ethereum wallets available on your browser.');
                    case 6: return [4 /*yield*/, this.web3Wallet.unlock()];
                    case 7:
                        if (!(_g.sent())) {
                            throw new Error('Your Ethereum wallet is locked or connected to another network.');
                        }
                        _g.label = 8;
                    case 8:
                        _b = this.boost;
                        _c = {
                            method: 'onchain'
                        };
                        return [4 /*yield*/, this.boostContract.create(guid, amount, this.boost.checksum)];
                    case 9:
                        _c.txHash = _g.sent();
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 10:
                        _b.nonce = (_c.address = _g.sent(),
                            _c);
                        return [3 /*break*/, 12];
                    case 11:
                        this.boost.nonce = {
                            method: 'offchain',
                            address: 'offchain'
                        };
                        _g.label = 12;
                    case 12: return [4 /*yield*/, this.client.post("api/v2/boost/" + this.object.type + "/" + this.object.guid + "/" + this.object.owner_guid, {
                            guid: guid,
                            bidType: this.boost.currency === 'usd' ? 'usd' : 'tokens',
                            impressions: this.boost.amount,
                            categories: this.boost.categories,
                            priority: this.boost.priority ? 1 : null,
                            paymentMethod: this.boost.nonce,
                            checksum: this.boost.checksum,
                        })];
                    case 13:
                        _g.sent();
                        return [3 /*break*/, 26];
                    case 14:
                        tokenDec = (new BN(10)).pow(new BN(18)).toString();
                        bid = (this.boost.amount || 0) * tokenDec;
                        _d = this.boost.currency;
                        switch (_d) {
                            case 'onchain': return [3 /*break*/, 15];
                            case 'offchain': return [3 /*break*/, 22];
                            case 'creditcard': return [3 /*break*/, 23];
                        }
                        return [3 /*break*/, 24];
                    case 15: return [4 /*yield*/, this.web3Wallet.ready()];
                    case 16:
                        _g.sent();
                        if (!this.web3Wallet.isUnavailable()) return [3 /*break*/, 17];
                        throw new Error('No Ethereum wallets available on your browser.');
                    case 17: return [4 /*yield*/, this.web3Wallet.unlock()];
                    case 18:
                        if (!(_g.sent())) {
                            throw new Error('Your Ethereum wallet is locked or connected to another network.');
                        }
                        _g.label = 19;
                    case 19:
                        _e = this.boost;
                        _f = {
                            method: 'onchain'
                        };
                        return [4 /*yield*/, this.boostContract.createPeer(this.boost.target.eth_wallet, guid, this.boost.amount, this.boost.checksum)];
                    case 20:
                        _f.txHash = _g.sent();
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 21:
                        _e.nonce = (_f.address = _g.sent(),
                            _f);
                        return [3 /*break*/, 24];
                    case 22:
                        this.boost.nonce = {
                            method: 'offchain',
                            address: 'offchain'
                        };
                        return [3 /*break*/, 24];
                    case 23:
                        this.boost.nonce = {
                            method: 'creditcard',
                            address: 'creditcard',
                            token: this.boost.nonce
                        };
                        throw new Error('Credit Card offer boost is deprecated');
                    case 24: return [4 /*yield*/, this.client.post("api/v2/boost/peer/" + this.object.guid + "/" + this.object.owner_guid, {
                            guid: guid,
                            currency: 'tokens',
                            bid: bid.toString(),
                            destination: this.boost.target.guid,
                            scheduledTs: this.boost.scheduledTs,
                            postToFacebook: this.boost.postToFacebook ? 1 : null,
                            paymentMethod: this.boost.nonce,
                            checksum: this.boost.checksum,
                        })];
                    case 25:
                        _g.sent();
                        _g.label = 26;
                    case 26:
                        this.success = true;
                        setTimeout(function () {
                            _this.overlayModal.dismiss();
                        }, 2500);
                        return [3 /*break*/, 29];
                    case 27:
                        e_1 = _g.sent();
                        if (e_1 && e_1.stage === 'transaction') {
                            throw new Error('Sorry, your payment failed. Please, try again, use another card or wallet.');
                        }
                        else {
                            this.error = (e_1 && e_1.message) || 'Sorry, something went wrong';
                            console.warn(this.error);
                        }
                        return [3 /*break*/, 29];
                    case 28:
                        this.inProgress = false;
                        return [7 /*endfinally*/];
                    case 29: return [2 /*return*/];
                }
            });
        });
    };
    BoostCreatorComponent.prototype.prepare = function (entityGuid) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, guid, checksum;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.client.get("api/v2/boost/prepare/" + entityGuid)];
                    case 1:
                        _a = (_b.sent()) || {}, guid = _a.guid, checksum = _a.checksum;
                        if (!guid) {
                            throw new Error('Cannot generate GUID');
                        }
                        return [2 /*return*/, { guid: guid, checksum: checksum }];
                }
            });
        });
    };
    __decorate([
        core_1.Input('object'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BoostCreatorComponent.prototype, "data", null);
    __decorate([
        core_1.ViewChild('amountEditor'),
        __metadata("design:type", core_1.ElementRef)
    ], BoostCreatorComponent.prototype, "_amountEditor", void 0);
    BoostCreatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [common_1.CurrencyPipe],
            selector: 'm-boost--creator',
            templateUrl: 'creator.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            core_1.ChangeDetectorRef,
            overlay_modal_1.OverlayModalService,
            api_1.Client,
            common_1.CurrencyPipe,
            token_contract_service_1.TokenContractService,
            boost_contract_service_1.BoostContractService,
            web3_wallet_service_1.Web3WalletService,
            offchain_payment_service_1.OffchainPaymentService])
    ], BoostCreatorComponent);
    return BoostCreatorComponent;
}());
exports.BoostCreatorComponent = BoostCreatorComponent;
//# sourceMappingURL=creator.component.js.map