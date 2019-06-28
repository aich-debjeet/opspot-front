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
var ethAccount = require("ethjs-account");
var Eth = require("ethjs");
var BN = require("bn.js");
var transaction_overlay_service_1 = require("./transaction-overlay.service");
var token_contract_service_1 = require("../contracts/token-contract.service");
var router_1 = require("@angular/router");
var web3_wallet_service_1 = require("../web3-wallet.service");
var TransactionOverlayComponent = /** @class */ (function () {
    function TransactionOverlayComponent(service, cd, token, web3Wallet, router) {
        this.service = service;
        this.cd = cd;
        this.token = token;
        this.web3Wallet = web3Wallet;
        this.router = router;
        this._isHidden = true;
        this.message = '';
        this.opspot = window.Opspot;
        this.data = {
            unlock: {
                privateKey: '',
                secureMode: true
            },
            tx: {},
            extras: {},
        };
        this.balance = '0';
        this.ethBalance = '0';
        this.droppingKeyFile = false;
        this.eventEmitter = new core_1.EventEmitter();
        this.COMP_METAMASK = 1;
        this.COMP_LOCAL = 2;
        this.COMP_UNLOCK = 3;
    }
    TransactionOverlayComponent.prototype.ngOnInit = function () {
        this.service.setComponent(this);
    };
    Object.defineProperty(TransactionOverlayComponent.prototype, "isHidden", {
        get: function () {
            return this._isHidden;
        },
        enumerable: true,
        configurable: true
    });
    TransactionOverlayComponent.prototype.show = function (comp, message, defaultTxObject, extras) {
        if (message === void 0) { message = ''; }
        if (defaultTxObject === void 0) { defaultTxObject = null; }
        if (extras === void 0) { extras = {}; }
        this.message = message;
        this.comp = comp;
        this.reset();
        this.setTx(defaultTxObject);
        this.data.extras = extras;
        this.droppingKeyFile = false;
        this._isHidden = false;
        this.detectChanges();
        this.onDidShow();
        return this.eventEmitter;
    };
    TransactionOverlayComponent.prototype.hide = function () {
        this.message = '';
        this.comp = void 0;
        this.reset();
        this.droppingKeyFile = false;
        this._isHidden = true;
        this.detectChanges();
    };
    TransactionOverlayComponent.prototype.reset = function () {
        this.data = {
            unlock: {
                privateKey: '',
                secureMode: true
            },
            tx: {},
            extras: {},
        };
    };
    TransactionOverlayComponent.prototype.setTx = function (tx) {
        if (!tx) {
            this.data.tx = {};
            return;
        }
        this.data.tx = Object.assign({}, tx);
        if (typeof this.data.tx.gasPrice !== 'undefined') {
            this.data.tx.gasPrice = Eth.fromWei(this.data.tx.gasPrice, 'Gwei');
        }
        if (typeof this.data.tx.gas === 'undefined') {
            this.data.tx.gas = 0;
        }
    };
    TransactionOverlayComponent.prototype.getTx = function () {
        if (!this.data.tx) {
            return {};
        }
        var tx = Object.assign({}, this.data.tx);
        tx.gasPrice = Eth.toWei(tx.gasPrice, 'Gwei');
        return tx;
    };
    //
    TransactionOverlayComponent.prototype.validateUnlock = function () {
        if (!this.data.unlock.privateKey) {
            return false;
        }
        try {
            var privateKey = this.data.unlock.privateKey;
            if (privateKey.substr(0, 2) !== '0x') {
                privateKey = "0x" + privateKey;
            }
            ethAccount.privateToAccount(privateKey);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    TransactionOverlayComponent.prototype.unlock = function () {
        if (!this.validateUnlock()) {
            return;
        }
        var privateKey = this.data.unlock.privateKey;
        if (privateKey.substr(0, 2) !== '0x') {
            privateKey = "0x" + privateKey;
        }
        this.eventEmitter.next({
            privateKey: privateKey,
            secureMode: this.data.unlock.secureMode
        });
        this.hide();
    };
    TransactionOverlayComponent.prototype.keyDragOver = function (e) {
        if (this.comp !== this.COMP_UNLOCK) {
            return;
        }
        e.preventDefault();
        this.droppingKeyFile = true;
    };
    TransactionOverlayComponent.prototype.keyDragLeave = function (e) {
        if (this.comp !== this.COMP_UNLOCK) {
            return;
        }
        e.preventDefault();
        if (e.layerX < 0) {
            this.droppingKeyFile = false;
        }
    };
    TransactionOverlayComponent.prototype.keyDropFile = function (e) {
        if (this.comp !== this.COMP_UNLOCK) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        this.droppingKeyFile = false;
        var transfer = (e.dataTransfer || e.originalEvent.dataTransfer);
        if (!transfer) {
            console.warn('no transfer object');
            return;
        }
        var file = transfer.files[0];
        if (!file) {
            console.warn('file cannot be read');
            return;
        }
        switch (file.type) {
            case 'text/csv':
                // MetaMask
                this.loadKeyFromCSV(file);
                break;
            case 'application/json':
            case '':
                // Keystore JSON
                this.loadKeyFromJSON(file);
                break;
        }
    };
    TransactionOverlayComponent.prototype.loadKeyFromCSV = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            var privateKey = e.target.result.trim();
            try {
                if (privateKey.substr(0, 2) !== '0x') {
                    privateKey = "0x" + privateKey;
                }
                if (ethAccount.privateToAccount(privateKey)) {
                    _this.data.unlock.privateKey = privateKey;
                    _this.detectChanges();
                }
            }
            catch (e) { }
        };
        reader.readAsText(file);
    };
    TransactionOverlayComponent.prototype.loadKeyFromJSON = function (file) {
        throw new Error('Not implemented');
    };
    //
    TransactionOverlayComponent.prototype.validateTxObject = function () {
        return this.data.tx && this.data.tx.gasPrice && this.data.tx.gas && this.data.tx.from;
    };
    TransactionOverlayComponent.prototype.approve = function () {
        if (!this.validateTxObject()) {
            return;
        }
        this.eventEmitter.next(this.getTx());
        this.hide();
    };
    TransactionOverlayComponent.prototype.checkTokenBalance = function (passedTokenDelta) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenDelta, balance, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tokenDelta = new BN(passedTokenDelta);
                        if (tokenDelta.gte('0') || !this.data.tx.from) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = BN.bind;
                        return [4 /*yield*/, this.token.balanceOf(this.data.tx.from)];
                    case 2:
                        balance = new (_a.apply(BN, [void 0, (_b.sent())[0]]))();
                        this.balance = balance.toString(10);
                        if (balance.add(tokenDelta).lt('0')) {
                            this.reject('Not enough tokens to complete this transaction');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionOverlayComponent.prototype.getEthBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.web3Wallet.getBalance(this.data.tx.from)];
                    case 1:
                        balance = _a.sent();
                        this.ethBalance = balance ? balance : '0';
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
    //
    TransactionOverlayComponent.prototype.onDidShow = function () {
        switch (this.comp) {
            case this.COMP_LOCAL:
                if (this.data.extras.tokenDelta) {
                    this.checkTokenBalance(this.data.extras.tokenDelta);
                    this.getEthBalance();
                }
                break;
        }
    };
    //
    TransactionOverlayComponent.prototype.cancel = function () {
        this.eventEmitter.next(false);
        this.hide();
    };
    TransactionOverlayComponent.prototype.reject = function (message) {
        this.eventEmitter.next(new Error(message));
        this.hide();
    };
    //
    TransactionOverlayComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.HostBinding('hidden'),
        __metadata("design:type", Boolean)
    ], TransactionOverlayComponent.prototype, "_isHidden", void 0);
    __decorate([
        core_1.HostListener('dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TransactionOverlayComponent.prototype, "keyDragOver", null);
    __decorate([
        core_1.HostListener('dragleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TransactionOverlayComponent.prototype, "keyDragLeave", null);
    __decorate([
        core_1.HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TransactionOverlayComponent.prototype, "keyDropFile", null);
    TransactionOverlayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm--blockchain--transaction-overlay',
            templateUrl: 'transaction-overlay.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [transaction_overlay_service_1.TransactionOverlayService,
            core_1.ChangeDetectorRef,
            token_contract_service_1.TokenContractService,
            web3_wallet_service_1.Web3WalletService,
            router_1.Router])
    ], TransactionOverlayComponent);
    return TransactionOverlayComponent;
}());
exports.TransactionOverlayComponent = TransactionOverlayComponent;
//# sourceMappingURL=transaction-overlay.component.js.map