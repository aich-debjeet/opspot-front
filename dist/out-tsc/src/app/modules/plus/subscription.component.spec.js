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
///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var client_1 = require("../../services/api/client");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var verify_1 = require("../../mocks/modules/plus/verify");
var faq_1 = require("../../mocks/modules/plus/faq");
var subscription_1 = require("../../mocks/modules/plus/subscription");
var subscription_component_1 = require("./subscription.component");
var testing_2 = require("@angular/router/testing");
var forms_1 = require("@angular/forms");
var service_1 = require("../../modules/modals/signup/service");
var overlay_modal_1 = require("../../services/ux/overlay-modal");
var overlay_modal_service_mock_spec_1 = require("../../../tests/overlay-modal-service-mock.spec");
var session_1 = require("../../services/session");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var wire_service_1 = require("../../modules/wire/wire.service");
var web3_wallet_service_1 = require("../blockchain/web3-wallet.service");
var token_contract_service_1 = require("../blockchain/contracts/token-contract.service");
var token_contract_service_mock_spec_1 = require("../../../tests/token-contract-service-mock.spec");
var material_mock_spec_1 = require("../../../tests/material-mock.spec");
var material_switch_mock_spec_1 = require("../../../tests/material-switch-mock.spec");
var platform_browser_1 = require("@angular/platform-browser");
var web3WalletServiceMock = new function () {
    var _this = this;
    this.wallets = ['0x123', '0x1234'];
    this.balance = 127000000000000000000;
    this.onChainInterfaceLabel = 'Metamask';
    this.unavailable = false;
    this.locked = false;
    this.isUnavailable = jasmine.createSpy('isUnavailable').and.callFake(function () {
        return _this.unavailable;
    });
    this.unlock = jasmine.createSpy('unlock').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, !this.locked];
        });
    }); });
    this.ready = jasmine.createSpy('ready').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, true];
        });
    }); });
    this.getWallets = jasmine.createSpy('getWallets').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.wallets];
        });
    }); });
    this.getCurrentWallet = jasmine.createSpy('getCurrentWallet').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.wallets[0]];
        });
    }); });
    this.getBalance = jasmine.createSpy('getBalance').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.balance];
        });
    }); });
    this.getOnChainInterfaceLabel = jasmine.createSpy('getOnChainInterfaceLabel').and.callFake(function () {
        return _this.onChainInterfaceLabel ? _this.onChainInterfaceLabel : 'Metamask';
    });
};
var wireServiceMock = new function () {
    var _this = this;
    this.wireSent = new core_1.EventEmitter();
    this.submitWire = jasmine.createSpy('submitWire').and.callFake(function (wireStruc) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, { success: true }];
        });
    }); });
};
var signupServiceMock = new function () {
    this.initOnScroll = jasmine.createSpy('initOnScroll').and.stub();
    this.open = jasmine.createSpy('open').and.stub();
    this.close = jasmine.createSpy('close').and.stub();
};
var OpspotTokenSymbolComponent = /** @class */ (function () {
    function OpspotTokenSymbolComponent() {
    }
    OpspotTokenSymbolComponent = __decorate([
        core_1.Component({
            selector: 'm--crypto-token-symbol',
            template: ''
        })
    ], OpspotTokenSymbolComponent);
    return OpspotTokenSymbolComponent;
}());
exports.OpspotTokenSymbolComponent = OpspotTokenSymbolComponent;
var StripeCheckoutMock = /** @class */ (function () {
    function StripeCheckoutMock() {
        this.inputed = new core_1.EventEmitter;
        this.done = new core_1.EventEmitter;
        this.amount = 0;
        this.gateway = 'merchants';
        this.useMDLStyling = true;
        this.useCreditCard = true;
        this.useBitcoin = false;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], StripeCheckoutMock.prototype, "amount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], StripeCheckoutMock.prototype, "merchant_guid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], StripeCheckoutMock.prototype, "gateway", void 0);
    __decorate([
        core_1.Input('useMDLStyling'),
        __metadata("design:type", Boolean)
    ], StripeCheckoutMock.prototype, "useMDLStyling", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], StripeCheckoutMock.prototype, "useCreditCard", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], StripeCheckoutMock.prototype, "useBitcoin", void 0);
    StripeCheckoutMock = __decorate([
        core_1.Component({
            selector: 'opspot-payments-stripe-checkout',
            outputs: ['inputed', 'done'],
            template: ''
        })
    ], StripeCheckoutMock);
    return StripeCheckoutMock;
}());
exports.StripeCheckoutMock = StripeCheckoutMock;
describe('PlusSubscriptionComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                subscription_component_1.PlusSubscriptionComponent,
                subscription_1.PlusSubscription,
                OpspotTokenSymbolComponent,
                StripeCheckoutMock,
                verify_1.PlusVerify,
                faq_1.FaqMock
            ],
            imports: [
                testing_2.RouterTestingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            providers: [
                { provide: web3_wallet_service_1.Web3WalletService, useValue: web3WalletServiceMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: wire_service_1.WireService, useValue: wireServiceMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: service_1.SignupModalService, useValue: signupServiceMock },
                { provide: token_contract_service_1.TokenContractService, useValue: token_contract_service_mock_spec_1.tokenContractServiceMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
            ]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(subscription_component_1.PlusSubscriptionComponent);
        window.Opspot.blockchain = {
            plus_address: 'oxtn'
        };
        comp = fixture.componentInstance;
        window.Opspot.user = {
            "guid": "732337264197111809",
            "type": "user",
            "subtype": false,
            "time_created": "1499978809",
            "time_updated": false,
            "container_guid": "0",
            "owner_guid": "0",
            "site_guid": false,
            "access_id": "2",
            "name": "opspot",
            "username": "opspot",
            "language": "en",
            "icontime": "1506690756",
            "legacy_guid": false,
            "featured_id": false,
            "banned": "no",
            "website": "",
            "dob": "",
            "gender": "",
            "city": "",
            "merchant": {},
            "boostProPlus": false,
            "fb": false,
            "mature": 0,
            "monetized": "",
            "signup_method": false,
            "social_profiles": [],
            "feature_flags": false,
            "programs": ["affiliate"],
            "plus": true,
            "verified": false,
            "disabled_boost": false,
            "show_boosts": false,
            "chat": true,
            "subscribed": false,
            "subscriber": false,
            "subscriptions_count": 1,
            "impressions": 10248,
            "boost_rating": "2",
            "spam": 0,
            "deleted": 0
        };
        // Set up mock HTTP client
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v1/plus'] = {
            'status': 'success',
            'active': false
        };
        client_mock_spec_1.clientMock.response['api/v1/plus/subscription'] = {
            'status': 'success',
            'active': true
        };
        fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable().then(function () {
                done();
            });
        }
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('Should load correctly', testing_1.fakeAsync(function () {
        comp.user = {
            "feature_flags": false,
            "programs": ["affiliate"],
            "plus": true,
            "verified": false,
            "disabled_boost": false,
            "show_boosts": false,
            "chat": true,
            "subscribed": false,
        };
        var subscription = fixture.debugElement.query(platform_browser_1.By.css('.m-plus--subscription'));
        expect(subscription).toBeNull();
        fixture.detectChanges();
        expect(comp.isPlus()).toBe(true);
        comp.cancel();
        testing_1.tick();
        fixture.detectChanges();
        expect(comp.isPlus()).toBe(false);
    }));
    it('Should load using the proper endpoint', function () {
        comp.load();
        fixture.detectChanges();
        expect(comp.isPlus()).toBe(true);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/plus');
    });
    it('Should load correctly plus is false', testing_1.fakeAsync(function () {
        comp.user = {
            "feature_flags": false,
            "programs": ["affiliate"],
            "plus": false,
            "verified": false,
            "disabled_boost": false,
            "show_boosts": false,
            "chat": true,
            "subscribed": false,
        };
        var subscription = fixture.debugElement.query(platform_browser_1.By.css('.m-plus--subscription'));
        expect(subscription).toBeNull();
        fixture.detectChanges();
        expect(comp.isPlus()).toBe(false);
        comp.purchase(20, 'month');
        testing_1.tick();
        fixture.detectChanges();
        expect(overlay_modal_service_mock_spec_1.overlayModalServiceMock.create).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=subscription.component.spec.js.map