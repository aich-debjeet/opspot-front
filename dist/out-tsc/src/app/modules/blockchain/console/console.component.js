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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var blockchain_service_1 = require("../blockchain.service");
var web3_wallet_service_1 = require("../web3-wallet.service");
var BlockchainConsoleComponent = /** @class */ (function () {
    function BlockchainConsoleComponent(fb, blockchain, route, web3Wallet) {
        this.fb = fb;
        this.blockchain = blockchain;
        this.route = route;
        this.web3Wallet = web3Wallet;
        this.inProgress = false;
        this.error = '';
    }
    BlockchainConsoleComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            address: ['', forms_1.Validators.pattern(/^0x[a-fA-F0-9]{40}$/)],
        });
        this.getWallet();
    };
    BlockchainConsoleComponent.prototype.getWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address, localWallet, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.error = '';
                        this.inProgress = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        return [4 /*yield*/, this.blockchain.getWallet(true)];
                    case 2:
                        address = _a.sent();
                        if (!address) return [3 /*break*/, 3];
                        this.form.controls.address.setValue(address);
                        return [3 /*break*/, 6];
                    case 3:
                        if (!this.route.snapshot.params.auto) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.web3Wallet.ready()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 5:
                        localWallet = _a.sent();
                        if (localWallet) {
                            this.form.controls.address.setValue(localWallet);
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1 = _a.sent();
                        this.error = (e_1 && e_1.message) || 'There was an issue getting your saved wallet info';
                        return [3 /*break*/, 9];
                    case 8:
                        this.inProgress = false;
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    BlockchainConsoleComponent.prototype.setWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.error = '';
                        this.inProgress = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.blockchain.setWallet(this.form.value)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_2 = _a.sent();
                        this.error = (e_2 && e_2.message) || 'There was an issue saving the wallet info';
                        return [3 /*break*/, 5];
                    case 4:
                        this.inProgress = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BlockchainConsoleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-blockchain--console',
            templateUrl: 'console.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            blockchain_service_1.BlockchainService,
            router_1.ActivatedRoute,
            web3_wallet_service_1.Web3WalletService])
    ], BlockchainConsoleComponent);
    return BlockchainConsoleComponent;
}());
exports.BlockchainConsoleComponent = BlockchainConsoleComponent;
//# sourceMappingURL=console.component.js.map