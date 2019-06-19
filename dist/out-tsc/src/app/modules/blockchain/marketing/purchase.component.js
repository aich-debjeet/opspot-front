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
var client_1 = require("../../../services/api/client");
var title_1 = require("../../../services/ux/title");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var session_1 = require("../../../services/session");
var web3_wallet_service_1 = require("../web3-wallet.service");
var token_distribution_event_service_1 = require("../contracts/token-distribution-event.service");
var BlockchainPurchaseComponent = /** @class */ (function () {
    function BlockchainPurchaseComponent(client, changeDetectorRef, title, overlayModal, web3Wallet, tde, session) {
        this.client = client;
        this.changeDetectorRef = changeDetectorRef;
        this.title = title;
        this.overlayModal = overlayModal;
        this.web3Wallet = web3Wallet;
        this.tde = tde;
        this.session = session;
        this.stats = {
            amount: 0,
            count: 0,
            requested: 0,
            issued: 0,
        };
        //amount: number = 0.25;
        this.tokens = 500;
        this.address = '';
        this.ofac = false;
        this.use = false;
        this.terms = false;
        this.autodetectedWallet = null;
        this.opspot = window.Opspot;
        this.showPledgeModal = false;
        this.showLoginModal = false;
        this.confirming = false;
        this.confirmed = false;
        this.phase = 'presale';
        this.inProgress = false;
        this.rate = 100;
    }
    BlockchainPurchaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadWalletAddress();
        this.load().then(function () {
            _this.amount = 0.25;
        });
    };
    Object.defineProperty(BlockchainPurchaseComponent.prototype, "amount", {
        get: function () {
            var newAmnt = this.tokens / this.rate;
            var wei = Math.pow(10, 18);
            return Math.ceil(newAmnt * wei) / wei; // Rounds up amount and add 1/1000th ETH to compensate for rounding
        },
        set: function (value) {
            console.log(value);
            this.tokens = value * this.rate;
        },
        enumerable: true,
        configurable: true
    });
    BlockchainPurchaseComponent.prototype.load = function () {
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
                        return [4 /*yield*/, this.client.get('api/v2/blockchain/purchase')];
                    case 2:
                        response = _a.sent();
                        this.stats = {
                            amount: response.amount,
                            count: response.count,
                            requested: response.requested,
                            issued: response.issued,
                        };
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        this.inProgress = false;
                        this.detectChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockchainPurchaseComponent.prototype.loadWalletAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 1:
                        address = _a.sent();
                        this.address = address ? address : '';
                        this.autodetectedWallet = !!this.address;
                        this.detectChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockchainPurchaseComponent.prototype.purchase = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load()];
                    case 1:
                        _a.sent();
                        if (this.session.isLoggedIn()) {
                            this.showPledgeModal = true;
                        }
                        else {
                            this.showLoginModal = true;
                        }
                        this.detectChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockchainPurchaseComponent.prototype.canConfirm = function () {
        return this.amount > 0 && this.ofac && this.use && this.terms;
    };
    BlockchainPurchaseComponent.prototype.confirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tx, amount, comp, err_1, response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.confirming = true;
                        this.detectChanges();
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        comp = 0.000000000000000001;
                        amount = parseFloat((this.amount + comp).toFixed(18)); // Allow for small rounding discrepencies caused by recurring decimals
                        return [4 /*yield*/, this.tde.buy(amount, this.rate)];
                    case 2:
                        tx = _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _e.sent();
                        this.error = err_1;
                        this.confirming = false;
                        this.detectChanges();
                        return [2 /*return*/];
                    case 4:
                        _b = (_a = this.client).post;
                        _c = ['api/v2/blockchain/purchase'];
                        _d = {
                            tx: tx,
                            amount: amount.toString()
                        };
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 5: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.wallet_address = _e.sent(),
                                _d)]))];
                    case 6:
                        response = _e.sent();
                        this.confirming = false;
                        this.confirmed = true;
                        this.detectChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockchainPurchaseComponent.prototype.closeLoginModal = function () {
        this.showPledgeModal = true;
        this.showLoginModal = false;
        this.detectChanges();
    };
    BlockchainPurchaseComponent.prototype.closePledgeModal = function () {
        this.showPledgeModal = false;
        this.detectChanges();
    };
    BlockchainPurchaseComponent.prototype.promptTokenInput = function (input) {
        alert('Please enter how many tokens you wish to purchase');
        setTimeout(function () { input.focus(); }, 100);
    };
    BlockchainPurchaseComponent.prototype.detectChanges = function () {
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BlockchainPurchaseComponent.prototype, "phase", void 0);
    BlockchainPurchaseComponent = __decorate([
        core_1.Component({
            selector: 'm-blockchain--purchase',
            templateUrl: 'purchase.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef,
            title_1.OpspotTitle,
            overlay_modal_1.OverlayModalService,
            web3_wallet_service_1.Web3WalletService,
            token_distribution_event_service_1.TokenDistributionEventService,
            session_1.Session])
    ], BlockchainPurchaseComponent);
    return BlockchainPurchaseComponent;
}());
exports.BlockchainPurchaseComponent = BlockchainPurchaseComponent;
//# sourceMappingURL=purchase.component.js.map