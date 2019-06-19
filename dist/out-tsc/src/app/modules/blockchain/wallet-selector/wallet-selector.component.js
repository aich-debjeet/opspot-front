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
var web3_wallet_service_1 = require("../web3-wallet.service");
var BlockchainWalletSelector = /** @class */ (function () {
    function BlockchainWalletSelector(web3Wallet, cd) {
        this.web3Wallet = web3Wallet;
        this.cd = cd;
        this.allowOffchain = false;
        this.selectEventEmitter = new core_1.EventEmitter();
        this.autoselectChangeEmitter = new core_1.EventEmitter();
        this.web3Unavailable = false;
        this.web3Locked = false;
        this.web3Wallets = [];
    }
    BlockchainWalletSelector.prototype.ngOnInit = function () {
        this.refresh();
    };
    BlockchainWalletSelector.prototype.refresh = function () {
        this.setWeb3Wallets([]);
        this.detectChanges();
        this.getWallets();
    };
    BlockchainWalletSelector.prototype.setWeb3Wallets = function (wallets) {
        if (wallets === void 0) { wallets = []; }
        if (this.allowOffchain) {
            wallets.push({
                address: 'offchain',
                label: 'Offchain Wallet',
            });
        }
        this.web3Wallets = wallets;
    };
    BlockchainWalletSelector.prototype.getWallets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, wallets;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.web3Wallet.isUnavailable();
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.web3Wallet.isLocked()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            this.web3Unavailable = this.web3Wallet.isUnavailable();
                            this.web3Locked = true;
                            this.detectChanges();
                            this._lockedWeb3CheckTimer = setTimeout(function () { return _this.getWallets(); }, 1000); // check again in 1s
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.web3Wallet.getWallets()];
                    case 3:
                        wallets = (_b.sent())
                            .map(function (address) { return ({ address: address, label: address }); });
                        this.web3Unavailable = false;
                        this.web3Locked = false;
                        this.setWeb3Wallets(wallets);
                        if (this.autoselect && this.web3Wallets.length > 0) {
                            this.setWallet(this.web3Wallets[0].address);
                            this.autoselect = false;
                            this.autoselectChangeEmitter.emit(false);
                        }
                        this.detectChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockchainWalletSelector.prototype.ngOnDestroy = function () {
        if (this._lockedWeb3CheckTimer) {
            clearTimeout(this._lockedWeb3CheckTimer);
        }
    };
    BlockchainWalletSelector.prototype.setWallet = function (wallet) {
        this.selectEventEmitter.emit(wallet);
    };
    BlockchainWalletSelector.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BlockchainWalletSelector.prototype, "current", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BlockchainWalletSelector.prototype, "autoselect", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BlockchainWalletSelector.prototype, "allowOffchain", void 0);
    __decorate([
        core_1.Output('select'),
        __metadata("design:type", core_1.EventEmitter)
    ], BlockchainWalletSelector.prototype, "selectEventEmitter", void 0);
    __decorate([
        core_1.Output('autoselectChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], BlockchainWalletSelector.prototype, "autoselectChangeEmitter", void 0);
    BlockchainWalletSelector = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-blockchain--wallet-selector',
            templateUrl: 'wallet-selector.component.html',
            exportAs: 'BlockchainWalletSelector',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [web3_wallet_service_1.Web3WalletService,
            core_1.ChangeDetectorRef])
    ], BlockchainWalletSelector);
    return BlockchainWalletSelector;
}());
exports.BlockchainWalletSelector = BlockchainWalletSelector;
//# sourceMappingURL=wallet-selector.component.js.map