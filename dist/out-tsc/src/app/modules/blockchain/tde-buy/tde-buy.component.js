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
var token_distribution_event_service_1 = require("../contracts/token-distribution-event.service");
var client_1 = require("../../../services/api/client");
var web3_wallet_service_1 = require("../web3-wallet.service");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var BlockchainTdeBuyComponent = /** @class */ (function () {
    function BlockchainTdeBuyComponent(cd, tokenDistributionEvent, client, web3Wallet, overlayModal) {
        this.cd = cd;
        this.tokenDistributionEvent = tokenDistributionEvent;
        this.client = client;
        this.web3Wallet = web3Wallet;
        this.overlayModal = overlayModal;
        this.error = '';
        this.metamaskError = '';
        this.pledged = null;
        this.address = '…';
    }
    Object.defineProperty(BlockchainTdeBuyComponent.prototype, "opts", {
        set: function (opts) {
            this._opts = opts;
        },
        enumerable: true,
        configurable: true
    });
    BlockchainTdeBuyComponent.prototype.ngOnInit = function () {
        this.updatePledgeConfirmation();
        this.tdeAddress = this.web3Wallet.config.token_distribution_event_address;
    };
    BlockchainTdeBuyComponent.prototype.ngOnDestroy = function () {
        if (this._checkWalletAvailabilityTimer) {
            clearTimeout(this._checkWalletAvailabilityTimer);
        }
    };
    BlockchainTdeBuyComponent.prototype.updatePledgeConfirmation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        this.detectChanges();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.get('api/v2/blockchain/pledges', { brief: 1 })];
                    case 2:
                        response = _a.sent();
                        if (!response.pledge) {
                            throw new Error('No pledge found');
                        }
                        this.pledged = response.pledge.eth_amount;
                        this.address = response.pledge.wallet_address;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.inProgress = false;
                        this.detectChanges();
                        this.checkWalletAvailability();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockchainTdeBuyComponent.prototype.checkWalletAvailability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metamaskError;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metamaskError = '';
                        this._checkWalletAvailabilityTimer = void 0;
                        if (!this.metamaskError) {
                            this.inProgress = true;
                            this.detectChanges();
                        }
                        if (!this.web3Wallet.isUnavailable()) return [3 /*break*/, 1];
                        metamaskError = 'There are no Ethereum wallet clients available.';
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.web3Wallet.unlock()];
                    case 2:
                        if (!(_a.sent())) {
                            metamaskError = 'There are no local wallets available, the wallet manager is locked, or you\'re connected to a different network.';
                        }
                        _a.label = 3;
                    case 3:
                        this.inProgress = false;
                        if (this.metamaskError !== metamaskError) {
                            this.metamaskError = metamaskError;
                        }
                        this.detectChanges();
                        if (this.metamaskError) {
                            this._checkWalletAvailabilityTimer = setTimeout(function () { return _this.checkWalletAvailability(); }, 1000); // check again in 1s
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockchainTdeBuyComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    BlockchainTdeBuyComponent.prototype.buy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bought, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        this.detectChanges();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, this.tokenDistributionEvent.buy(this.pledged, 0)];
                    case 2: return [4 /*yield*/, _a.sent()];
                    case 3:
                        bought = _a.sent();
                        if (bought) {
                            this.success = true;
                            if (this._opts && this._opts.onComplete) {
                                this._opts.onComplete({ done: true });
                            }
                        }
                        else {
                            this.error = 'There was an issue buying tokens';
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        e_2 = _a.sent();
                        this.error = (e_2 && e_2.message) || 'There was an issue buying tokens';
                        return [3 /*break*/, 6];
                    case 5:
                        this.inProgress = false;
                        this.detectChanges();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BlockchainTdeBuyComponent.prototype.changeAmount = function () {
        if (this._opts && this._opts.onComplete) {
            this._opts.onComplete({ changeAmount: true });
        }
        this.overlayModal.dismiss();
    };
    BlockchainTdeBuyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-blockchain--tde-buy',
            templateUrl: 'tde-buy.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            token_distribution_event_service_1.TokenDistributionEventService,
            client_1.Client,
            web3_wallet_service_1.Web3WalletService,
            overlay_modal_1.OverlayModalService])
    ], BlockchainTdeBuyComponent);
    return BlockchainTdeBuyComponent;
}());
exports.BlockchainTdeBuyComponent = BlockchainTdeBuyComponent;
//# sourceMappingURL=tde-buy.component.js.map