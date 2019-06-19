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
var router_1 = require("@angular/router");
var client_1 = require("../../../../../services/api/client");
var session_1 = require("../../../../../services/session");
var local_wallet_service_1 = require("../../../../blockchain/local-wallet.service");
var blockchain_service_1 = require("../../../../blockchain/blockchain.service");
var web3_wallet_service_1 = require("../../../../blockchain/web3-wallet.service");
var browser_1 = require("../../../../../utils/browser");
var Views;
(function (Views) {
    Views[Views["CreateAddress"] = 1] = "CreateAddress";
    Views[Views["ProvideAddress"] = 2] = "ProvideAddress";
    Views[Views["UseExternal"] = 3] = "UseExternal";
})(Views || (Views = {}));
var TokenOnChainOnboardingComponent = /** @class */ (function () {
    function TokenOnChainOnboardingComponent(client, cd, session, router, localWallet, blockchain, web3Wallet) {
        this.client = client;
        this.cd = cd;
        this.session = session;
        this.router = router;
        this.localWallet = localWallet;
        this.blockchain = blockchain;
        this.web3Wallet = web3Wallet;
        this.skippable = true;
        this.next = new core_1.EventEmitter();
        this.inProgress = false;
        this.providedAddress = '';
        this.hasExternal = false;
        this.downloadingMetamask = false;
        this.opspot = window.Opspot;
        this.Views = Views;
    }
    TokenOnChainOnboardingComponent.prototype.ngOnInit = function () {
        //already completed step
        if (this.session.getLoggedInUser().eth_wallet) {
            this.next.next();
            return;
        }
        this.checkExternal();
    };
    TokenOnChainOnboardingComponent.prototype.ngOnDestroy = function () {
        if (this._externalTimer) {
            clearInterval(this._externalTimer);
        }
    };
    TokenOnChainOnboardingComponent.prototype.checkExternal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.web3Wallet.isLocal()];
                    case 1:
                        _a.hasExternal = !(_b.sent());
                        this.detectChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    TokenOnChainOnboardingComponent.prototype.createAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, 4, 5]);
                        this.inProgress = true;
                        this.detectChanges();
                        _a = this;
                        return [4 /*yield*/, this.localWallet.create(false)];
                    case 1:
                        _a.generatedAccount = _b.sent();
                        return [4 /*yield*/, this.blockchain.setWallet({ address: this.generatedAccount.address })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _b.sent();
                        console.error(e_1);
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
    TokenOnChainOnboardingComponent.prototype.downloadPrivateKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, address, privateKey, filename, blob, link, objectUrl_1;
            var _this = this;
            return __generator(this, function (_b) {
                try {
                    this.inProgress = true;
                    this.detectChanges();
                    _a = this.generatedAccount, address = _a.address, privateKey = _a.privateKey, filename = "pk_" + address + ".csv", blob = new Blob([privateKey], { type: 'text/csv' });
                    if (window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveBlob(blob, filename);
                    }
                    else {
                        link = window.document.createElement('a'), objectUrl_1 = window.URL.createObjectURL(blob);
                        link.href = objectUrl_1;
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        setTimeout(function () {
                            URL.revokeObjectURL(objectUrl_1);
                            _this.generatedAccount = null;
                            _this.next.next();
                        }, 1000);
                    }
                }
                catch (e) {
                    console.error(e);
                    this.inProgress = false;
                }
                return [2 /*return*/];
            });
        });
    };
    TokenOnChainOnboardingComponent.prototype.canProvideAddress = function () {
        return this.providedAddress && /^0x[a-fA-F0-9]{40}$/.test(this.providedAddress);
    };
    TokenOnChainOnboardingComponent.prototype.provideAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.canProvideAddress() || this.inProgress) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.inProgress = true;
                        this.detectChanges();
                        return [4 /*yield*/, this.blockchain.setWallet({ address: this.providedAddress })];
                    case 2:
                        _a.sent();
                        this.next.next();
                        return [3 /*break*/, 5];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
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
    TokenOnChainOnboardingComponent.prototype.downloadMetamask = function () {
        var browser = browser_1.getBrowser();
        var url = '';
        switch (browser) {
            case 'chrome':
                url = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
            case 'firefox':
                url = 'https://addons.mozilla.org/firefox/addon/ether-metamask/';
            case 'opera':
                url = 'https://addons.opera.com/extensions/details/metamask/';
            default:
                url = 'https://metamask.io';
        }
        window.open(url);
        this.downloadingMetamask = true;
    };
    TokenOnChainOnboardingComponent.prototype.useExternal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3Wallet.ready()];
                    case 1:
                        _a.sent();
                        this.detectExternal();
                        this._externalTimer = setInterval(function () {
                            _this.detectExternal();
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    TokenOnChainOnboardingComponent.prototype.detectExternal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 1:
                        address = (_a.sent()) || '';
                        if (this.providedAddress !== address) {
                            this.providedAddress = address;
                            this.detectChanges();
                            if (this.providedAddress) {
                                clearInterval(this._externalTimer);
                                this.provideAddress();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TokenOnChainOnboardingComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TokenOnChainOnboardingComponent.prototype, "skippable", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TokenOnChainOnboardingComponent.prototype, "next", void 0);
    TokenOnChainOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-token--onboarding--onchain',
            templateUrl: 'onchain.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef,
            session_1.Session,
            router_1.Router,
            local_wallet_service_1.LocalWalletService,
            blockchain_service_1.BlockchainService,
            web3_wallet_service_1.Web3WalletService])
    ], TokenOnChainOnboardingComponent);
    return TokenOnChainOnboardingComponent;
}());
exports.TokenOnChainOnboardingComponent = TokenOnChainOnboardingComponent;
//# sourceMappingURL=onchain.component.js.map