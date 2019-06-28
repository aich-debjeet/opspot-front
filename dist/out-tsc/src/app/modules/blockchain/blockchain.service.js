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
var client_1 = require("../../services/api/client");
var BlockchainService = /** @class */ (function () {
    function BlockchainService(client) {
        this.client = client;
    }
    BlockchainService_1 = BlockchainService;
    // Wallet
    BlockchainService.prototype.getWallet = function (refresh) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refresh && this.serverWalletAddressCache) {
                            return [2 /*return*/, this.serverWalletAddressCache];
                        }
                        this.serverWalletAddressCache = void 0;
                        return [4 /*yield*/, this.client.get("api/v2/blockchain/wallet/address")];
                    case 1:
                        response = _a.sent();
                        if (response.wallet) {
                            this.serverWalletAddressCache = response.wallet.address;
                            return [2 /*return*/, response.wallet.address];
                        }
                        else {
                            throw new Error('There was an issue getting your saved wallet info');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockchainService.prototype.setWallet = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post("api/v2/blockchain/wallet", data)];
                    case 1:
                        _a.sent();
                        this.serverWalletAddressCache = data.address;
                        window.Opspot.user.eth_wallet = data.address;
                        return [2 /*return*/];
                }
            });
        });
    };
    BlockchainService.prototype.getBalance = function (refresh) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refresh && typeof this.serverBalanceCache !== 'undefined') {
                            return [2 /*return*/, this.serverBalanceCache];
                        }
                        this.serverBalanceCache = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.get("api/v2/blockchain/wallet/balance")];
                    case 2:
                        response = _a.sent();
                        this.serverBalanceCache = response.balance;
                        return [2 /*return*/, response.balance];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Service provider
    BlockchainService._ = function (client) {
        return new BlockchainService_1(client);
    };
    var BlockchainService_1;
    BlockchainService = BlockchainService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [client_1.Client])
    ], BlockchainService);
    return BlockchainService;
}());
exports.BlockchainService = BlockchainService;
//# sourceMappingURL=blockchain.service.js.map