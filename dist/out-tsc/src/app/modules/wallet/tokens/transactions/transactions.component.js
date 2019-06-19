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
var client_1 = require("../../../../services/api/client");
var session_1 = require("../../../../services/session");
var web3_wallet_service_1 = require("../../../blockchain/web3-wallet.service");
var WalletTokenTransactionsComponent = /** @class */ (function () {
    function WalletTokenTransactionsComponent(client, web3Wallet, cd, router, route, session) {
        this.client = client;
        this.web3Wallet = web3Wallet;
        this.cd = cd;
        this.router = router;
        this.route = route;
        this.session = session;
        this.addresses = [];
        this.inProgress = false;
        this.transactions = [];
        this.moreData = true;
        this.selectedAddress = null;
        this.selectedContract = null;
        this.contracts = [
            'withdraw',
            'wire',
            'offchain:wire',
            'plus',
            'token',
            'offchain:reward',
        ];
        this.contractsToggle = false;
        this.addressesToggle = false;
        this.preview = false; // Preview mode
        this.remote = false;
        this.remoteUser = '';
    }
    WalletTokenTransactionsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.paramsSubscription = this.route.params.subscribe(function (params) { return __awaiter(_this, void 0, void 0, function () {
                    var contract, d;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (params['contract']) {
                                    contract = params['contract'];
                                    if (contract !== 'all' && this.contracts.indexOf(contract) !== -1) {
                                        this.selectedContract = contract;
                                    }
                                    else if (contract !== 'all') {
                                        this.router.navigate(['/wallet/token/transactions', 'all']);
                                    }
                                }
                                this.remote = !!params['remote'];
                                this.remoteUser = params['remote'] || '';
                                d = new Date();
                                d.setHours(23, 59, 59);
                                this.endDate = d.toISOString();
                                d.setMonth(d.getMonth() - 1);
                                d.setHours(0, 0, 0);
                                this.startDate = d.toISOString();
                                return [4 /*yield*/, this.getAddresses()];
                            case 1:
                                _a.sent();
                                this.load(true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    WalletTokenTransactionsComponent.prototype.getAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var receiverAddress, onchainAddress, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        if (!!this.remote) return [3 /*break*/, 5];
                        receiverAddress = this.session.getLoggedInUser().eth_wallet;
                        this.addresses = [
                            {
                                address: receiverAddress,
                                label: 'Receiver',
                                selected: false
                            },
                            {
                                label: 'OffChain',
                                address: 'offchain',
                                selected: false
                            }
                        ];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.web3Wallet.getCurrentWallet()];
                    case 2:
                        onchainAddress = _a.sent();
                        if (!onchainAddress) {
                            this.inProgress = false;
                            this.detectChanges();
                            return [2 /*return*/];
                        }
                        if (this.addresses[0].address.toLowerCase() == onchainAddress.toLowerCase()) {
                            this.addresses[0].label = 'OnChain & Receiver';
                            this.inProgress = false;
                            this.detectChanges();
                            return [2 /*return*/]; //no need to count twice
                        }
                        this.addresses.unshift({
                            'label': "OnChain",
                            'address': onchainAddress,
                            'selected': false
                        });
                        this.inProgress = false;
                        this.detectChanges();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.selectedAddress = null;
                        this.addresses = [];
                        this.inProgress = false;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    WalletTokenTransactionsComponent.prototype.load = function (refresh) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, startDate, endDate, opts, response, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.inProgress && !refresh) {
                            return [2 /*return*/];
                        }
                        if (refresh) {
                            this.transactions = [];
                            this.offset = '';
                            this.moreData = true;
                        }
                        this.inProgress = true;
                        this.detectChanges();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        startDate = new Date(this.startDate), endDate = new Date(this.endDate);
                        startDate.setHours(0, 0, 0);
                        endDate.setHours(23, 59, 59);
                        opts = {
                            from: Math.floor(+startDate / 1000),
                            to: Math.floor(+endDate / 1000),
                            offset: this.offset
                        };
                        if (this.selectedAddress) {
                            opts.address = this.selectedAddress;
                        }
                        if (this.selectedContract)
                            opts.contract = this.selectedContract;
                        if (this.remote && this.remoteUser) {
                            opts.remote = this.remoteUser;
                        }
                        return [4 /*yield*/, this.client.get("api/v2/blockchain/transactions/ledger", opts)];
                    case 2:
                        response = _b.sent();
                        if (refresh) {
                            this.transactions = [];
                        }
                        if (response) {
                            (_a = this.transactions).push.apply(_a, (response.transactions || []));
                            if (response['load-next']) {
                                this.offset = response['load-next'];
                            }
                            else {
                                this.moreData = false;
                                this.inProgress = false;
                            }
                        }
                        else {
                            console.error('No data');
                            this.moreData = false;
                            this.inProgress = false;
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        e_2 = _b.sent();
                        console.error(e_2);
                        this.moreData = false;
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
    WalletTokenTransactionsComponent.prototype.onStartDateChange = function (newDate) {
        this.startDate = newDate;
        this.load(true);
    };
    WalletTokenTransactionsComponent.prototype.onEndDateChange = function (newDate) {
        this.endDate = newDate;
        this.load(true);
    };
    WalletTokenTransactionsComponent.prototype.toggleContractsMenu = function (forceValue) {
        if (typeof forceValue !== 'undefined') {
            this.contractsToggle = forceValue;
            return;
        }
        this.contractsToggle = !this.contractsToggle;
    };
    WalletTokenTransactionsComponent.prototype.toggleAddressesMenu = function (forceValue) {
        if (typeof forceValue !== 'undefined') {
            this.addressesToggle = forceValue;
            return;
        }
        this.addressesToggle = !this.addressesToggle;
    };
    WalletTokenTransactionsComponent.prototype.toggleContract = function (contract) {
        if (this.selectedContract === contract) {
            this.selectedContract = null;
        }
        else {
            this.selectedContract = contract;
        }
        if (this.selectedContract === 'offchain:wire') {
            this.toggleAddress(null);
        }
        this.detectChanges();
        this.load(true);
    };
    WalletTokenTransactionsComponent.prototype.toggleAddress = function (address) {
        this.addresses.forEach(function (item) {
            item.selected = false;
        });
        if (address) {
            address.selected = true;
        }
        this.selectedAddress = address ? address.address : null;
        this.detectChanges();
        this.load(true);
    };
    WalletTokenTransactionsComponent.prototype.getSelf = function (transaction) {
        if (this.remote) {
            var isSender = transaction.sender.username.toLowerCase() == this.remoteUser.toLowerCase(), user = isSender ? transaction.sender : transaction.receiver;
            return {
                avatar: "/icon/" + user.guid + "/medium/" + user.icontime,
                username: user.username,
            };
        }
        else {
            var user = this.session.getLoggedInUser();
            return {
                avatar: "/icon/" + user.guid + "/medium/" + user.icontime,
                username: user.username,
            };
        }
    };
    WalletTokenTransactionsComponent.prototype.getOther = function (transaction) {
        var selfUsername = this.remote ? this.remoteUser : this.session.getLoggedInUser().username, isSender = transaction.sender.username.toLowerCase() != selfUsername.toLowerCase(), user = isSender ? transaction.sender : transaction.receiver;
        return {
            avatar: "/icon/" + user.guid + "/medium/" + user.icontime,
            username: user.username,
            isSender: isSender,
        };
    };
    WalletTokenTransactionsComponent.prototype.isP2p = function (transaction) {
        var contractName = this.getNormalizedContractName(transaction.contract);
        if (contractName === 'wire' || contractName == 'offchain wire' || contractName === 'boost') {
            return !!transaction.sender && !!transaction.receiver;
        }
    };
    WalletTokenTransactionsComponent.prototype.getNormalizedContractName = function (contractName) {
        if (contractName.indexOf('offchain:') > -1) {
            var name_1 = contractName.substr(9);
            return name_1 === 'wire' ? 'offchain wire' : name_1;
        }
        return contractName;
    };
    WalletTokenTransactionsComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WalletTokenTransactionsComponent.prototype, "preview", void 0);
    WalletTokenTransactionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wallet-token--transactions',
            templateUrl: 'transactions.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_1.Client,
            web3_wallet_service_1.Web3WalletService,
            core_1.ChangeDetectorRef,
            router_1.Router,
            router_1.ActivatedRoute,
            session_1.Session])
    ], WalletTokenTransactionsComponent);
    return WalletTokenTransactionsComponent;
}());
exports.WalletTokenTransactionsComponent = WalletTokenTransactionsComponent;
//# sourceMappingURL=transactions.component.js.map