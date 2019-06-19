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
var client_service_1 = require("../../common/api/client.service");
var web3_wallet_service_1 = require("../blockchain/web3-wallet.service");
var token_contract_service_1 = require("../blockchain/contracts/token-contract.service");
var wire_service_1 = require("../wire/wire.service");
var overlay_modal_1 = require("../../services/ux/overlay-modal");
var service_1 = require("../modals/signup/service");
var creator_component_1 = require("../wire/payments-creator/creator.component");
var session_1 = require("../../services/session");
var PlusSubscriptionComponent = /** @class */ (function () {
    function PlusSubscriptionComponent(client, tokenContract, wireService, web3Wallet, overlayModal, modal, session, cd) {
        this.client = client;
        this.tokenContract = tokenContract;
        this.wireService = wireService;
        this.web3Wallet = web3Wallet;
        this.overlayModal = overlayModal;
        this.modal = modal;
        this.session = session;
        this.cd = cd;
        this.user = window.Opspot.user;
        this.blockchain = window.Opspot.blockchain;
        this.inProgress = true;
        this.completed = false;
        this.active = false;
        this.completed$ = new core_1.EventEmitter;
        this.payment = {};
    }
    PlusSubscriptionComponent.prototype.load = function () {
        var _this = this;
        return this.client.get('api/v1/plus')
            .then(function (_a) {
            var active = _a.active;
            if (active)
                _this.active = true;
            return active;
        })
            .catch(function (e) {
            throw e;
        });
    };
    PlusSubscriptionComponent.prototype.isPlus = function () {
        if (this.active || this.user && this.user.plus)
            return true;
        return false;
    };
    PlusSubscriptionComponent.prototype.setSource = function (source) {
        this.source = source;
        this.purchase();
    };
    PlusSubscriptionComponent.prototype.purchase = function (amount, period) {
        if (amount === void 0) { amount = 20; }
        if (period === void 0) { period = 'month'; }
        return __awaiter(this, void 0, void 0, function () {
            var creator;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.session.isLoggedIn()) {
                    this.modal.open();
                    return [2 /*return*/];
                }
                this.payment.period = period;
                this.payment.amount = amount;
                this.payment.entity_guid = '730071191229833224';
                this.payment.receiver = this.blockchain.plus_address;
                creator = this.overlayModal.create(creator_component_1.WirePaymentsCreatorComponent, this.payment, {
                    default: this.payment,
                    onComplete: function (wire) {
                        _this.completed = true;
                        _this.user.plus = true;
                        _this.active = true;
                        _this.detectChanges();
                        _this.completed$.next(true);
                    }
                });
                creator.present();
                return [2 /*return*/];
            });
        });
    };
    PlusSubscriptionComponent.prototype.cancel = function () {
        var _this = this;
        this.inProgress = true;
        this.error = '';
        this.detectChanges();
        return this.client.delete('api/v1/plus/subscription')
            .then(function (response) {
            _this.inProgress = false;
            _this.user.plus = false;
            _this.active = false;
            _this.detectChanges();
        });
    };
    PlusSubscriptionComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Output('completed'),
        __metadata("design:type", core_1.EventEmitter)
    ], PlusSubscriptionComponent.prototype, "completed$", void 0);
    __decorate([
        core_1.Input('showSubscription'),
        __metadata("design:type", Boolean)
    ], PlusSubscriptionComponent.prototype, "showSubscription", void 0);
    PlusSubscriptionComponent = __decorate([
        core_1.Component({
            selector: 'm-plus--subscription',
            templateUrl: 'subscription.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_service_1.Client,
            token_contract_service_1.TokenContractService,
            wire_service_1.WireService,
            web3_wallet_service_1.Web3WalletService,
            overlay_modal_1.OverlayModalService,
            service_1.SignupModalService,
            session_1.Session,
            core_1.ChangeDetectorRef])
    ], PlusSubscriptionComponent);
    return PlusSubscriptionComponent;
}());
exports.PlusSubscriptionComponent = PlusSubscriptionComponent;
//# sourceMappingURL=subscription.component.js.map