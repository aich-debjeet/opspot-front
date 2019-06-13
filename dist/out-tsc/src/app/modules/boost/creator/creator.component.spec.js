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
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var abbr_1 = require("../../../common/pipes/abbr");
var token_pipe_1 = require("../../../common/pipes/token.pipe");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var scheduler_1 = require("../../../common/components/scheduler/scheduler");
var web3_wallet_service_1 = require("../../blockchain/web3-wallet.service");
var offchain_payment_service_1 = require("../../blockchain/offchain-payment.service");
var creator_component_1 = require("./creator.component");
var boost_service_1 = require("../boost.service");
var token_contract_service_1 = require("../../blockchain/contracts/token-contract.service");
var token_contract_service_mock_spec_1 = require("../../../../tests/token-contract-service-mock.spec");
var boost_contract_service_1 = require("../../blockchain/contracts/boost-contract.service");
var peer_boost_contract_service_mock_spec_1 = require("../../../../tests/peer-boost-contract-service-mock.spec");
var transaction_overlay_service_mock_spec_1 = require("../../../../tests/transaction-overlay-service-mock.spec");
var local_wallet_service_1 = require("../../blockchain/local-wallet.service");
var transaction_overlay_service_1 = require("../../blockchain/transaction-overlay/transaction-overlay.service");
var local_wallet_service_mock_spec_1 = require("../../../../tests/local-wallet-service-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var session_1 = require("../../../services/session");
/* tslint:disable */
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
var CategoriesSelectorMock = /** @class */ (function () {
    function CategoriesSelectorMock() {
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
    ], CategoriesSelectorMock.prototype, "amount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CategoriesSelectorMock.prototype, "merchant_guid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CategoriesSelectorMock.prototype, "gateway", void 0);
    __decorate([
        core_1.Input('useMDLStyling'),
        __metadata("design:type", Boolean)
    ], CategoriesSelectorMock.prototype, "useMDLStyling", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CategoriesSelectorMock.prototype, "useCreditCard", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CategoriesSelectorMock.prototype, "useBitcoin", void 0);
    CategoriesSelectorMock = __decorate([
        core_1.Component({
            selector: 'm--categories-selector',
            outputs: ['inputed', 'done'],
            template: ''
        })
    ], CategoriesSelectorMock);
    return CategoriesSelectorMock;
}());
exports.CategoriesSelectorMock = CategoriesSelectorMock;
var BoostPaymentMethodsMock = /** @class */ (function () {
    function BoostPaymentMethodsMock() {
        this.boostChange = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostPaymentMethodsMock.prototype, "rates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostPaymentMethodsMock.prototype, "boost", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BoostPaymentMethodsMock.prototype, "boostChange", void 0);
    BoostPaymentMethodsMock = __decorate([
        core_1.Component({
            selector: 'm-boost--creator-payment-methods',
            template: ''
        })
    ], BoostPaymentMethodsMock);
    return BoostPaymentMethodsMock;
}());
exports.BoostPaymentMethodsMock = BoostPaymentMethodsMock;
var BoostCategorySelectorMock = /** @class */ (function () {
    function BoostCategorySelectorMock() {
        this.boostChange = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostCategorySelectorMock.prototype, "boost", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BoostCategorySelectorMock.prototype, "boostChange", void 0);
    BoostCategorySelectorMock = __decorate([
        core_1.Component({
            selector: 'm-boost--creator-categories',
            template: ''
        })
    ], BoostCategorySelectorMock);
    return BoostCategorySelectorMock;
}());
exports.BoostCategorySelectorMock = BoostCategorySelectorMock;
var BoostP2PSearchMock = /** @class */ (function () {
    function BoostP2PSearchMock() {
        this.boostChange = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostP2PSearchMock.prototype, "boost", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BoostP2PSearchMock.prototype, "boostChange", void 0);
    BoostP2PSearchMock = __decorate([
        core_1.Component({
            selector: 'm-boost--creator-p2p-search',
            template: ''
        })
    ], BoostP2PSearchMock);
    return BoostP2PSearchMock;
}());
exports.BoostP2PSearchMock = BoostP2PSearchMock;
var BoostCheckoutMock = /** @class */ (function () {
    function BoostCheckoutMock() {
        this.boostChange = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostCheckoutMock.prototype, "boost", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BoostCheckoutMock.prototype, "boostChange", void 0);
    BoostCheckoutMock = __decorate([
        core_1.Component({
            selector: 'm-boost--creator-checkout',
            template: ''
        })
    ], BoostCheckoutMock);
    return BoostCheckoutMock;
}());
exports.BoostCheckoutMock = BoostCheckoutMock;
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
exports.SELECTED_CATEGORIES_MOCK_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SelectedCategoriesMock; }),
    multi: true
};
var SelectedCategoriesMock = /** @class */ (function () {
    function SelectedCategoriesMock() {
        this.propagateChange = function (_) {
        };
    }
    SelectedCategoriesMock.prototype.unselectCategory = function (category) {
        var index = this.selectedCategories.findIndex(function (value) {
            return value.id === category.id;
        });
        this.selectedCategories.splice(index, 1);
        this.selectedCategories = this.selectedCategories.slice();
    };
    SelectedCategoriesMock.prototype.ngOnChanges = function (changes) {
        this.propagateChange(changes);
    };
    SelectedCategoriesMock.prototype.writeValue = function (value) {
        this.selectedCategories = value;
    };
    SelectedCategoriesMock.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    SelectedCategoriesMock.prototype.registerOnTouched = function (fn) {
    };
    SelectedCategoriesMock = __decorate([
        core_1.Component({
            selector: 'm--selected-categories',
            outputs: ['inputed', 'done'],
            template: '',
            host: {
                'change': 'propagateChange($event.target.value)'
            },
            providers: [exports.SELECTED_CATEGORIES_MOCK_VALUE_ACCESSOR]
        })
    ], SelectedCategoriesMock);
    return SelectedCategoriesMock;
}());
exports.SelectedCategoriesMock = SelectedCategoriesMock;
var CryptoTokenSymbolMock = /** @class */ (function () {
    function CryptoTokenSymbolMock() {
    }
    CryptoTokenSymbolMock = __decorate([
        core_1.Component({
            selector: 'm--crypto-token-symbol',
            template: ''
        })
    ], CryptoTokenSymbolMock);
    return CryptoTokenSymbolMock;
}());
var BlockchainCheckoutMock = /** @class */ (function () {
    function BlockchainCheckoutMock() {
    }
    BlockchainCheckoutMock = __decorate([
        core_1.Component({
            selector: 'm-checkout--blockchain',
            template: ''
        })
    ], BlockchainCheckoutMock);
    return BlockchainCheckoutMock;
}());
describe('BoostCreatorComponent', function () {
    var boostComponent;
    var fixture;
    var submitSection;
    var boostSubmitButton;
    window.Opspot.categories = {
        "art": "Art",
        "animals": "Animals",
        "music": "Music",
        "science": "Science",
        "technology": "Technology",
        "gaming": "Gaming",
        "history": "History",
        "nature": "Nature",
        "news": "News",
        "politics": "Politics",
        "comedy": "Comedy",
        "film": "Film ",
        "education": "Education",
        "sports": "Sports",
        "food": "Food",
        "modeling": "Modeling",
        "spirituality": "Spirituality ",
        "travel": "Travel",
        "health": "Health"
    };
    var boostUser = {
        'guid': '123',
        'type': 'user',
        'subtype': false,
        'time_created': '1500037446',
        'time_updated': false,
        'container_guid': '0',
        'owner_guid': '0',
        'site_guid': false,
        'access_id': '2',
        'name': 'opspot',
        'username': 'opspot',
        'language': 'en',
        'icontime': false,
        'legacy_guid': false,
        'featured_id': false,
        'banned': 'no',
        'website': '',
        'briefdescription': 'test',
        'dob': '',
        'gender': '',
        'city': '',
        'merchant': {
            'service': 'stripe',
            'id': 'acct_1ApIzEA26BgQpK9C',
            'exclusive': { 'background': 1502453050, 'intro': '' }
        },
        'boostProPlus': false,
        'fb': false,
        'mature': 0,
        'monetized': '',
        'signup_method': false,
        'social_profiles': [],
        'feature_flags': false,
        'programs': ['affiliate'],
        'plus': false,
        'verified': false,
        'disabled_boost': false,
        'categories': ['news', 'film', 'spirituality'],
        'wire_rewards': null,
        'subscribed': false,
        'subscriber': false,
        'subscribers_count': 1,
        'subscriptions_count': 1,
        'impressions': 337,
        'boost_rating': '2'
    };
    var boostActivity = {
        type: 'activity',
        guid: '12345',
        owner_guid: '54321'
    };
    var boostTargetUser = {
        'guid': '100000000000000063',
        'type': 'user',
        'username': 'mark',
        'merchant': {
            'service': 'stripe',
            'id': 'acct_19QgKYEQcGuFgRfS',
            'exclusive': {
                'enabled': true,
                'amount': 2,
                'intro': ''
            }
        },
        'subscribers_count': 51467,
        'impressions': 758644,
        'boostProPlus': '1',
        'fb': {
            'uuid': '578128092345756',
            'name': 'Mark"s test page'
        }
    };
    var boostBlog = {
        guid: '111111111',
        type: 'object',
        title: 'MOCK BLOG ENTRY',
        description: 'THIS IS A MOCK BLOCK ENTRY :)',
        ownerObj: boostUser,
        owner_guid: boostUser.guid
    };
    function getPaymentMethodItem(i) {
        return fixture.debugElement.query(platform_browser_1.By.css("section.m-boost--creator-section-payment > ul.m-boost--creator-selector > li:nth-child(" + i + ")"));
    }
    function getAmountInput() {
        return fixture.debugElement.query(platform_browser_1.By.css('input.m-boost--creator-wide-input--edit'));
    }
    function getAmountLabel() {
        return fixture.debugElement.query(platform_browser_1.By.css('span.m-boost--creator-wide-input--label'));
    }
    function getErrorLabel() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-boost--creator--submit-error'));
    }
    function getBoostTypesList() {
        return fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-type > ul.m-boost--creator-selector'));
    }
    function getBoostTypeItem(i) {
        return fixture.debugElement.query(platform_browser_1.By.css("section.m-boost--creator-section-type > ul.m-boost--creator-selector > li:nth-child(" + i + ")"));
    }
    function togglePriority() {
        fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-priority .m-boost--creator-toggle')).nativeElement.click();
        fixture.detectChanges();
    }
    function getSubmitButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-boost--creator--submit .m-boost--creator-button.m-boost--creator-button--submit'));
    }
    function getNextButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-boost--creator-section-submit .m-boost--creator--submit button.m-boost--creator-button'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                abbr_1.AbbrPipe,
                scheduler_1.Scheduler,
                token_pipe_1.TokenPipe,
                StripeCheckoutMock,
                CategoriesSelectorMock,
                SelectedCategoriesMock,
                CryptoTokenSymbolMock,
                BlockchainCheckoutMock,
                creator_component_1.BoostCreatorComponent,
                BoostPaymentMethodsMock,
                BoostCategorySelectorMock,
                BoostP2PSearchMock,
                BoostCheckoutMock,
            ],
            imports: [forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                boost_service_1.BoostService,
                { provide: web3_wallet_service_1.Web3WalletService, useValue: web3WalletServiceMock },
                offchain_payment_service_1.OffchainPaymentService,
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
                { provide: token_contract_service_1.TokenContractService, useValue: token_contract_service_mock_spec_1.tokenContractServiceMock },
                { provide: boost_contract_service_1.BoostContractService, useValue: peer_boost_contract_service_mock_spec_1.peerBoostContractServiceMock },
                { provide: local_wallet_service_1.LocalWalletService, useValue: local_wallet_service_mock_spec_1.localWalletServiceMock },
                { provide: transaction_overlay_service_1.TransactionOverlayService, useValue: transaction_overlay_service_mock_spec_1.transactionOverlayServiceMock },
            ]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(creator_component_1.BoostCreatorComponent);
        boostComponent = fixture.componentInstance;
        // Set up mock HTTP client
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v1/guid'] = { 'status': 'success', 'guid': '123' };
        // send a boost - POST `api/v1/boost/${boostType}/${this.object.guid}/${this.object.owner_guid}`
        //clientMock.response[`api/v1/boost/peer/${boostActivity.guid}/${boostActivity.owner_guid}`] = { 'status': 'success' };
        // boost.service
        // GET `api/v1/boost/${type}/${filter}`
        // PUT `api/v1/boost/peer/${boost.guid}`
        // DELETE `api/v1/boost/peer/${boost.guid}`
        // P2P DELETE `api/v1/boost/peer/${boost.guid}/revoke`
        // Network DELETE `api/v1/boost/${boost.handler}/${boost.guid}/revoke`
        // boost.component -> GET `api/v1/boost/rates`
        client_mock_spec_1.clientMock.response["api/v2/boost/rates"] = {
            'status': 'success',
            'balance': 28540,
            'hasPaymentMethod': false,
            'rate': 1,
            'cap': 5000,
            'min': 500,
            'priority': 1,
            'usd': 1000,
            'minUsd': 1,
            'tokens': 1000,
        };
        // boost.component -> GET `api/v1/search`
        submitSection = fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-submit'));
        boostSubmitButton = fixture.debugElement.query(platform_browser_1.By.css('.m-boost--creator--submit > button.m-boost--creator-button'));
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
    it('should have a title', function () {
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-boost--creator--header h2'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Boost');
    });
    it('should have a boost type selection section', function () {
        var boostTypeSection = fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-type'));
        expect(boostTypeSection).not.toBeNull();
    });
    it('boost type selection section should have a title that says "Boost Type"', function () {
        var boostTypeTitle = fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-type > .m-boost--creator-section-title--small'));
        expect(boostTypeTitle).not.toBeNull();
        expect(boostTypeTitle.nativeElement.textContent).toContain('Boost Type');
    });
    it('should only offer "sidebars" boost type when the boosted item is NOT an "activity"', function () {
        boostComponent.object = boostUser;
        boostComponent.syncAllowedTypes();
        fixture.detectChanges();
        var availableBoostTypes = getBoostTypesList();
        expect(availableBoostTypes).not.toBeNull();
        expect(availableBoostTypes.nativeElement.children.length).toBe(1);
        expect(getBoostTypeItem(1).query(platform_browser_1.By.css('h4')).nativeElement.textContent).toContain('Sidebars');
    });
    it('should offer both "offers" (p2p) and "newsfeed" boost types when the boosted item is an "activity"', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.syncAllowedTypes();
        fixture.detectChanges();
        var availableBoostTypes = getBoostTypesList();
        expect(availableBoostTypes).not.toBeNull();
        expect(availableBoostTypes.nativeElement.children.length).toBe(2);
        expect(getBoostTypeItem(1).query(platform_browser_1.By.css('h4')).nativeElement.textContent).toContain('Feeds');
        expect(getBoostTypeItem(2).query(platform_browser_1.By.css('h4')).nativeElement.textContent).toContain('Offers');
    });
    it('should have an amount of views section, with an input and label', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-boost--creator--amount'))).not.toBeNull();
        expect(getAmountInput()).not.toBeNull();
        expect(getAmountLabel()).not.toBeNull();
    });
    it('changing amount input should change the boost"s amount', function () {
        var amountInput = getAmountInput();
        amountInput.nativeElement.value = '10';
        amountInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(boostComponent.boost.amount).toBe(10);
    });
    it('amount of views section should have a title that says "How many views do you want?"', function () {
        var amountSectionTitle = fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-amount > .m-boost--creator-section-title--small'));
        expect(amountSectionTitle).not.toBeNull();
        expect(amountSectionTitle.nativeElement.textContent).toContain('How many views do you want?');
    });
    it('should have a payment section', function () {
        var paymentSection = fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-payment'));
        expect(paymentSection).not.toBeNull();
    });
    it('payment section should have a title that says "Payment Method"', function () {
        var paymentTitle = fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-payment > .m-boost--creator-section-title--small'));
        expect(paymentTitle).not.toBeNull();
        expect(paymentTitle.nativeElement.textContent).toContain('Payment Method');
    });
    it('should have an instance of m-boost--creator-payment-methods', function () {
        var paymentMethods = fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-payment m-boost--creator-payment-methods'));
        expect(paymentMethods).not.toBeNull();
    });
    it('should have a priority section if credit card is selected', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.boost.currency = 'usd';
        boostComponent.syncAllowedTypes();
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-priority'))).not.toBeNull();
    });
    it('priority section should not appear if onchain is selected', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.boost.currency = 'onchain';
        boostComponent.syncAllowedTypes();
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-priority'))).toBeNull();
    });
    it('priority section should not appear if offchain is selected', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.boost.currency = 'offchain';
        boostComponent.syncAllowedTypes();
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('section.m-boost--creator-section-priority'))).toBeNull();
    });
    it('toggling the priority should affect the boost entity', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'usd';
        fixture.detectChanges();
        expect(boostComponent.boost.priority).toBeFalsy();
        togglePriority();
        expect(boostComponent.boost.priority).toBeTruthy();
    });
    it('when selecting credit card "next" button should appear', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'usd';
        fixture.detectChanges();
        expect(getNextButton()).not.toBeNull();
    });
    it('when selecting credit card "priority" button should appear', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'usd';
        fixture.detectChanges();
        expect(getNextButton()).not.toBeNull();
    });
    it('"priority" button should toggle boost.priority', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'usd';
        fixture.detectChanges();
        expect(boostComponent.boost.priority).toBeFalsy();
        togglePriority();
        expect(boostComponent.boost.priority).toBeTruthy();
    });
    it('clicking on the "next" button should show the stripe checkout component', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'usd';
        fixture.detectChanges();
        getNextButton().nativeElement.click();
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-boost--creator-section-checkout m-boost--creator-checkout'))).not.toBeNull();
    });
    it('"boost" button should be disabled by default', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'usd';
        fixture.detectChanges();
        getNextButton().nativeElement.click();
        fixture.detectChanges();
        expect(boostComponent.canSubmit()).toBeFalsy();
    });
    it('if nonce is set, "boost" button should be enabled', function () {
        boostComponent.object = { type: 'activity', guid: '123' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'usd';
        fixture.detectChanges();
        getNextButton().nativeElement.click();
        fixture.detectChanges();
        boostComponent.boost.nonce = 'nonce';
        fixture.detectChanges();
        expect(getSubmitButton().nativeElement.disabled).toBeFalsy();
    });
    it('clicking on "boost" should submit the boost', testing_1.fakeAsync(function () {
        boostComponent.object = { type: 'activity', guid: '123', owner_guid: '789' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'usd';
        fixture.detectChanges();
        getNextButton().nativeElement.click();
        fixture.detectChanges();
        boostComponent.boost.nonce = 'nonce';
        fixture.detectChanges();
        client_mock_spec_1.clientMock.response["api/v2/boost/prepare/" + boostComponent.object.guid] = {
            'status': 'success',
            'guid': '456'
        };
        spyOn(boostComponent, 'submit').and.callThrough();
        client_mock_spec_1.clientMock.get.calls.reset();
        client_mock_spec_1.clientMock.post.calls.reset();
        expect(boostComponent.canSubmit()).toBeTruthy();
        expect(boostComponent.inProgress).toBeFalsy();
        getSubmitButton().nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        jasmine.clock().tick(10);
        expect(boostComponent.submit).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe("api/v2/boost/" + boostComponent.object.type + "/" + boostComponent.object.guid + "/" + boostComponent.object.owner_guid);
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({
            bidType: "usd",
            categories: [],
            checksum: null,
            guid: null,
            impressions: 1000,
            paymentMethod: "nonce",
            priority: null
        });
        testing_1.tick(3000); // timeout for dismissal
        testing_1.discardPeriodicTasks();
    }));
    it('should fail submitting an "onchain" boost if wallet is unavailable', testing_1.fakeAsync(function () {
        web3WalletServiceMock.unavailable = true;
        boostComponent.object = { type: 'activity', guid: '123', owner_guid: '789' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'onchain';
        fixture.detectChanges();
        client_mock_spec_1.clientMock.get.calls.reset();
        client_mock_spec_1.clientMock.response["api/v2/boost/prepare/" + boostComponent.object.guid] = {
            'status': 'success',
            'guid': '456',
            'checksum': 'checksum'
        };
        getSubmitButton().nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toBe("api/v2/boost/prepare/" + boostComponent.object.guid);
        //it first waits for the wallet to be ready
        expect(web3WalletServiceMock.ready).toHaveBeenCalled();
        expect(web3WalletServiceMock.isUnavailable).toHaveBeenCalled();
        expect(boostComponent.error).toContain('No Ethereum wallets available on your browser.');
    }));
    it('should fail submitting an "onchain" boost if wallet is locked', testing_1.fakeAsync(function () {
        web3WalletServiceMock.unavailable = false;
        web3WalletServiceMock.locked = true;
        boostComponent.object = { type: 'activity', guid: '123', owner_guid: '789' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'onchain';
        fixture.detectChanges();
        testing_1.tick();
        jasmine.clock().tick(10);
        client_mock_spec_1.clientMock.response["api/v2/boost/prepare/" + boostComponent.object.guid] = {
            'status': 'success',
            'guid': '456',
            'checksum': 'checksum'
        };
        client_mock_spec_1.clientMock.get.calls.reset();
        getSubmitButton().nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toBe("api/v2/boost/prepare/" + boostComponent.object.guid);
        //it first waits for the wallet to be ready
        expect(web3WalletServiceMock.ready).toHaveBeenCalled();
        expect(web3WalletServiceMock.isUnavailable).toHaveBeenCalled();
        expect(boostComponent.error).toContain('Your Ethereum wallet is locked or connected to another network.');
    }));
    it('should submit an "onchain" boost', testing_1.fakeAsync(function () {
        web3WalletServiceMock.unavailable = false;
        web3WalletServiceMock.locked = false;
        boostComponent.object = { type: 'activity', guid: '123', owner_guid: '789' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'onchain';
        fixture.detectChanges();
        testing_1.tick();
        jasmine.clock().tick(10);
        client_mock_spec_1.clientMock.get.calls.reset();
        client_mock_spec_1.clientMock.response["api/v2/boost/prepare/" + boostComponent.object.guid] = {
            'status': 'success',
            'guid': '456',
            'checksum': 'checksum'
        };
        client_mock_spec_1.clientMock.get.calls.reset();
        client_mock_spec_1.clientMock.post.calls.reset();
        spyOn(boostComponent, 'submit').and.callThrough();
        getSubmitButton().nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        jasmine.clock().tick(10);
        expect(boostComponent.submit).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toBe("api/v2/boost/prepare/" + boostComponent.object.guid);
        //it first waits for the wallet to be ready
        expect(web3WalletServiceMock.ready).toHaveBeenCalled();
        expect(boostComponent.canSubmit()).toBeTruthy();
        expect(boostComponent.inProgress).toBeFalsy();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe("api/v2/boost/" + boostComponent.object.type + "/" + boostComponent.object.guid + "/" + boostComponent.object.owner_guid);
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({
            bidType: "tokens",
            categories: [],
            checksum: "checksum",
            guid: "456",
            impressions: 1000,
            paymentMethod: { method: "onchain", txHash: 'hash', address: "0x123" },
            priority: null
        });
        testing_1.tick(3000); // timeout for dismissal
        testing_1.discardPeriodicTasks();
    }));
    it('should submit an "offchain" boost', testing_1.fakeAsync(function () {
        web3WalletServiceMock.unavailable = false;
        web3WalletServiceMock.locked = false;
        boostComponent.object = { type: 'activity', guid: '123', owner_guid: '789' };
        boostComponent.syncAllowedTypes();
        boostComponent.boost.currency = 'offchain';
        fixture.detectChanges();
        testing_1.tick();
        jasmine.clock().tick(10);
        client_mock_spec_1.clientMock.get.calls.reset();
        client_mock_spec_1.clientMock.response["api/v2/boost/prepare/" + boostComponent.object.guid] = {
            'status': 'success',
            'guid': '456',
            'checksum': 'checksum'
        };
        client_mock_spec_1.clientMock.get.calls.reset();
        client_mock_spec_1.clientMock.post.calls.reset();
        spyOn(boostComponent, 'submit').and.callThrough();
        getSubmitButton().nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        jasmine.clock().tick(10);
        expect(boostComponent.submit).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toBe("api/v2/boost/prepare/" + boostComponent.object.guid);
        expect(boostComponent.canSubmit()).toBeTruthy();
        expect(boostComponent.inProgress).toBeFalsy();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe("api/v2/boost/" + boostComponent.object.type + "/" + boostComponent.object.guid + "/" + boostComponent.object.owner_guid);
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({
            bidType: "tokens",
            categories: [],
            checksum: "checksum",
            guid: "456",
            impressions: 1000,
            paymentMethod: { method: "offchain", address: "offchain" },
            priority: null
        });
        testing_1.tick(3000); // timeout for dismissal
        testing_1.discardPeriodicTasks();
    }));
});
/*


/*it('boost button should be disabled either if the user hasn"t entered data, there"s an error, the component"s loading something or just saved the boost', () => {
  spyOn(boostComponent, 'canSubmit').and.returnValue(true);
  fixture.detectChanges();
  expect(boostSubmitButton.nativeElement.disabled).toBeFalsy();

  boostComponent.criticalError = true;
  fixture.detectChanges();
  expect(boostSubmitButton.nativeElement.disabled).toBeTruthy();

  boostComponent.criticalError = false;
  boostComponent.inProgress = true;
  fixture.detectChanges();
  expect(boostSubmitButton.nativeElement.disabled).toBeTruthy();

  boostComponent.inProgress = false;
  boostComponent.success = true;
  fixture.detectChanges();
  expect(boostSubmitButton.nativeElement.disabled).toBeTruthy();

  boostComponent.success = false;
  (<jasmine.Spy>boostComponent.canSubmit).and.returnValue(false);
  fixture.detectChanges();
  expect(boostSubmitButton.nativeElement.disabled).toBeTruthy();
});

  it('should have a target section with label "Target", description, and search box', () => {
    const boostTargetSection = fixture.debugElement.query(By.css('section.m-boost--creator-section-target'));
    expect(boostTargetSection).not.toBeNull();

    const boostTargetTitle = fixture.debugElement.query(By.css('section.m-boost--creator-section-target > h3'));
    expect(boostTargetTitle).not.toBeNull();
    expect(boostTargetTitle.nativeElement.textContent).toContain('Target');

    const boostTargetDescription = fixture.debugElement.query(By.css('section.m-boost--creator-section-target > h3 > .m-boost--creator-section--title-context'));
    expect(boostTargetDescription).not.toBeNull();

    expect(boostTargetSearchInput).not.toBeNull();
  });

  it('should offer target suggestions when target input is changed', fakeAsync(() => {
    spyOn(boostComponent, 'searchTarget').and.callThrough();
    spyOn(boostComponent, 'setTarget').and.callThrough();

    let searchQuery = 'mark';

    clientMock.get.calls.reset();
    clientMock.response[`api/v1/search`] = {
      'status': 'success',
      'entities': [
        boostTargetUser
      ],
      'load-next': 9
    };

    boostTargetSearchInput.nativeElement.value = searchQuery;
    fixture.detectChanges();
    boostTargetSearchInput.nativeElement.dispatchEvent(new Event('input')); // NB: Need BOTH of these!
    boostTargetSearchInput.nativeElement.dispatchEvent(new Event('keyup')); // NB: Need BOTH of these!
    jasmine.clock().tick(1000);

    expect(boostComponent.searchTarget).toHaveBeenCalled();
    expect(clientMock.get).toHaveBeenCalled();

    tick();

    expect(boostComponent.targetResults.length).toBeGreaterThan(0);
    expect(boostComponent.targetResults[0]).toEqual(boostTargetUser);

    fixture.detectChanges();

    const searchTarget = fixture.debugElement.query(By.css('.m-boost--creator-autocomplete--results > .m-boost--creator-autocomplete--result:first-child'));
    expect(searchTarget).not.toBeNull();
    searchTarget.nativeElement.dispatchEvent(new Event('input'));
    searchTarget.nativeElement.dispatchEvent(new Event('mousedown'));
    searchTarget.nativeElement.click();
    fixture.detectChanges();
    tick();
    jasmine.clock().tick(10);
    expect(boostComponent.setTarget).toHaveBeenCalled();
    expect(boostComponent.boost.target).toEqual(boostTargetUser);
  }));*/
//# sourceMappingURL=creator.component.spec.js.map