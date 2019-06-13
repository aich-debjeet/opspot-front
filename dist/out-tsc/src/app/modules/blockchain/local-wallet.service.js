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
var transaction_overlay_service_1 = require("./transaction-overlay/transaction-overlay.service");
var random_string_1 = require("../../helpers/random-string");
var async_sleep_1 = require("../../helpers/async-sleep");
var ethSigner = require("ethjs-signer");
var ethAccount = require("ethjs-account");
var SECURE_MODE_TIMEOUT = 60 * 1000; // 1 minute
var LocalWalletService = /** @class */ (function () {
    function LocalWalletService(transactionOverlay) {
        this.transactionOverlay = transactionOverlay;
        this.secureMode = false;
        this.sign = ethSigner.sign;
    }
    LocalWalletService_1 = LocalWalletService;
    LocalWalletService.prototype.signTransaction = function (rawTx, cb) {
        if (!this.privateKey) {
            throw new Error('No Account Private Key');
        }
        return cb(null, this.sign(rawTx, this.privateKey));
    };
    LocalWalletService.prototype.accounts = function (cb) {
        var accounts = [];
        if (this.account) {
            accounts.push(this.account);
        }
        return cb(null, accounts);
    };
    LocalWalletService.prototype.unlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, privateKey, secureMode, account, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.account && this.privateKey) {
                            return [2 /*return*/, Promise.resolve(true)];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.transactionOverlay.waitForAccountUnlock()];
                    case 2:
                        _a = _b.sent(), privateKey = _a.privateKey, secureMode = _a.secureMode, account = ethAccount.privateToAccount(privateKey).address;
                        this.privateKey = privateKey;
                        this.account = account;
                        this.secureMode = !!secureMode;
                        this.prune();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        this.privateKey = void 0;
                        this.account = void 0;
                        this.secureMode = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, this.account && this.privateKey];
                }
            });
        });
    };
    LocalWalletService.prototype.prune = function () {
        var _this = this;
        if (this._pruneTimer) {
            clearTimeout(this._pruneTimer);
        }
        if (!this.secureMode) {
            return;
        }
        this._pruneTimer = setTimeout(function () {
            _this.account = void 0;
            _this.privateKey = void 0;
        }, SECURE_MODE_TIMEOUT);
    };
    LocalWalletService.prototype.create = function (fast) {
        if (fast === void 0) { fast = true; }
        return __awaiter(this, void 0, void 0, function () {
            var entropy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entropy = '';
                        if (!fast) return [3 /*break*/, 1];
                        entropy = random_string_1.default(64);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(entropy.length < 64)) return [3 /*break*/, 3];
                        entropy += random_string_1.default(8);
                        return [4 /*yield*/, async_sleep_1.default(Math.floor(Math.random() * (600 - 350 + 1)) + 350)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [4 /*yield*/, ethAccount.generate(entropy)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LocalWalletService._ = function (transactionOverlay) {
        return new LocalWalletService_1(transactionOverlay);
    };
    var LocalWalletService_1;
    LocalWalletService = LocalWalletService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transaction_overlay_service_1.TransactionOverlayService])
    ], LocalWalletService);
    return LocalWalletService;
}());
exports.LocalWalletService = LocalWalletService;
//# sourceMappingURL=local-wallet.service.js.map