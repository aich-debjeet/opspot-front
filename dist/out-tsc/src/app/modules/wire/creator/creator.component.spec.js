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
var testing_2 = require("@angular/router/testing");
var creator_component_1 = require("./creator.component");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var abbr_1 = require("../../../common/pipes/abbr");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var wire_service_1 = require("../wire.service");
var wire_contract_service_1 = require("../../blockchain/contracts/wire-contract.service");
var wire_contract_service_mock_spec_1 = require("../../../../tests/wire-contract-service-mock.spec");
var token_contract_service_1 = require("../../blockchain/contracts/token-contract.service");
var web3_wallet_service_1 = require("../../blockchain/web3-wallet.service");
var token_contract_service_mock_spec_1 = require("../../../../tests/token-contract-service-mock.spec");
var local_wallet_service_1 = require("../../blockchain/local-wallet.service");
var local_wallet_service_mock_spec_1 = require("../../../../tests/local-wallet-service-mock.spec");
var transaction_overlay_service_1 = require("../../blockchain/transaction-overlay/transaction-overlay.service");
var transaction_overlay_service_mock_spec_1 = require("../../../../tests/transaction-overlay-service-mock.spec");
var tooltip_component_1 = require("../../../common/components/tooltip/tooltip.component");
var address_excerpt_1 = require("../../../common/pipes/address-excerpt");
var token_pipe_1 = require("../../../common/pipes/token.pipe");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var web3_wallet_service_mock_spec_1 = require("../../../../tests/web3-wallet-service-mock.spec");
var if_feature_directive_1 = require("../../../common/directives/if-feature.directive");
var features_service_1 = require("../../../services/features.service");
/* tslint:disable */
var WireCreatorRewardsComponentMock = /** @class */ (function () {
    function WireCreatorRewardsComponentMock() {
        this.selectAmount = new core_1.EventEmitter(true);
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireCreatorRewardsComponentMock.prototype, "rewards", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireCreatorRewardsComponentMock.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireCreatorRewardsComponentMock.prototype, "amount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireCreatorRewardsComponentMock.prototype, "channel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireCreatorRewardsComponentMock.prototype, "sums", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WireCreatorRewardsComponentMock.prototype, "selectAmount", void 0);
    WireCreatorRewardsComponentMock = __decorate([
        core_1.Component({
            selector: 'm-wire--creator-rewards',
            template: ''
        })
    ], WireCreatorRewardsComponentMock);
    return WireCreatorRewardsComponentMock;
}());
exports.WireCreatorRewardsComponentMock = WireCreatorRewardsComponentMock;
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
var WireCreatorCryptoTokenSymbolMock = /** @class */ (function () {
    function WireCreatorCryptoTokenSymbolMock() {
    }
    WireCreatorCryptoTokenSymbolMock = __decorate([
        core_1.Component({
            selector: 'm--crypto-token-symbol',
            template: ''
        })
    ], WireCreatorCryptoTokenSymbolMock);
    return WireCreatorCryptoTokenSymbolMock;
}());
var WireCreatorBlockchainCheckoutMock = /** @class */ (function () {
    function WireCreatorBlockchainCheckoutMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireCreatorBlockchainCheckoutMock.prototype, "autoselect", void 0);
    WireCreatorBlockchainCheckoutMock = __decorate([
        core_1.Component({
            selector: 'm-checkout--blockchain',
            template: ''
        })
    ], WireCreatorBlockchainCheckoutMock);
    return WireCreatorBlockchainCheckoutMock;
}());
var wireServiceMock = new function () {
    var _this = this;
    this.wireSent = new core_1.EventEmitter();
    this.submitWire = jasmine.createSpy('submitWire').and.callFake(function (wireStruc) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, { success: true }];
        });
    }); });
};
describe('WireCreatorComponent', function () {
    var comp;
    var fixture;
    var submitSection;
    var sendButton;
    var owner = {
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
        'eth_wallet': '0x1234',
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
    function getPaymentMethodItem(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".m-wire--creator-selector > li:nth-child(" + i + ")"));
    }
    function getAmountInput() {
        return fixture.debugElement.query(platform_browser_1.By.css('input.m-wire--creator-wide-input--edit'));
    }
    function getAmountLabel() {
        return fixture.debugElement.query(platform_browser_1.By.css('span.m-wire--creator-wide-input--label'));
    }
    function getRecurringCheckbox() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator--recurring input[type=checkbox]'));
    }
    function getErrorLabel() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator--submit-error'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                abbr_1.AbbrPipe,
                WireCreatorRewardsComponentMock,
                StripeCheckoutMock,
                WireCreatorCryptoTokenSymbolMock,
                WireCreatorBlockchainCheckoutMock,
                creator_component_1.WireCreatorComponent,
                tooltip_component_1.TooltipComponent,
                address_excerpt_1.AddressExcerptPipe,
                token_pipe_1.TokenPipe,
                if_feature_directive_1.IfFeatureDirective,
            ],
            imports: [forms_1.FormsModule, testing_2.RouterTestingModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: wire_contract_service_1.WireContractService, useValue: wire_contract_service_mock_spec_1.wireContractServiceMock },
                { provide: wire_service_1.WireService, useValue: wireServiceMock },
                web3_wallet_service_1.Web3WalletService,
                features_service_1.FeaturesService,
                { provide: web3_wallet_service_1.Web3WalletService, useValue: web3_wallet_service_mock_spec_1.web3WalletServiceMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
                { provide: token_contract_service_1.TokenContractService, useValue: token_contract_service_mock_spec_1.tokenContractServiceMock },
                { provide: local_wallet_service_1.LocalWalletService, useValue: local_wallet_service_mock_spec_1.localWalletServiceMock },
                { provide: transaction_overlay_service_1.TransactionOverlayService, useValue: transaction_overlay_service_mock_spec_1.transactionOverlayServiceMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(creator_component_1.WireCreatorComponent);
        comp = fixture.componentInstance; // LoginForm test instance
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v2/boost/rates"] = {
            'status': 'success',
            'balance': 301529,
            'hasPaymentMethod': false,
            'rate': 1,
            'cap': 5000,
            'min': 100,
            'priority': 1,
            'usd': 1000,
            'minUsd': 1
        };
        client_mock_spec_1.clientMock.response["api/v1/wire/rewards/" + owner.guid] = {
            'status': 'success',
            'username': 'opspot',
            'wire_rewards': {
                'description': 'description',
                'rewards': {
                    'points': [{ 'amount': 10, 'description': 'description' }, {
                            'amount': 100,
                            'description': 'description'
                        }],
                    'money': [{ 'amount': 1, 'description': 'description' }, {
                            'amount': 10,
                            'description': ':)'
                        }, { 'amount': 1000, 'description': 'description' }]
                }
            },
            'merchant': {
                'service': 'stripe',
                'id': 'acct_123',
                'exclusive': { 'background': 1502474954, 'intro': 'Support me!' }
            },
            'eth_wallet': '0x1234',
            'sums': { 'points': '40', 'money': '3096' }
        };
        client_mock_spec_1.clientMock.response["api/v2/blockchain/wallet/balance"] = {
            status: 'success',
            addresses: [
                { address: '0xMOCK', balance: 500 * Math.pow(10, 18), label: 'Receiver' },
                { address: 'offchain', balance: 500 * Math.pow(10, 18), label: 'OffChain' },
            ],
            balance: 1000 * Math.pow(10, 18),
            wireCap: 100 * Math.pow(10, 18)
        };
        client_mock_spec_1.clientMock.response["api/v2/blockchain/rate/tokens"] = {
            status: 'success',
            rate: 10
        };
        submitSection = fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator-section--last'));
        sendButton = fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator--submit > button.m-wire--creator-button'));
        comp.owner = owner;
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
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator--header span'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Wire');
    });
    it('should have the target user\'s avatar', function () {
        var avatar = fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator--header-text .m-wire--avatar'));
        expect(avatar).not.toBeNull();
        var avatarAnchor = avatar.query(platform_browser_1.By.css('a'));
        expect(avatarAnchor).not.toBeNull();
        expect(avatarAnchor.nativeElement.href).toContain('/' + comp.owner.username);
        var avatarImage = avatarAnchor.query(platform_browser_1.By.css('img'));
        expect(avatarImage).not.toBeNull();
        expect(avatarImage.nativeElement.src).toContain('icon/' + comp.owner.guid);
    });
    it('should have subtext', function () {
        var subtitle = fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator--header .m-wire-creator--subtext'));
        expect(subtitle).not.toBeNull();
        expect(subtitle.nativeElement.textContent).toContain('Support @' + comp.owner.username + ' by sending them tokens. Once you send them the amount listed in the tiers, you can receive rewards if they are offered. Otherwise, it\'s a donation.');
    });
    it('should have a payment section', function () {
        var section = fixture.debugElement.query(platform_browser_1.By.css('section.m-wire--creator-payment-section'));
        expect(section).not.toBeNull();
    });
    it('payment section should have a title that says \'Payment Method\'', function () {
        var title = fixture.debugElement.query(platform_browser_1.By.css('section.m-wire--creator-payment-section > .m-wire--creator-section-title--small'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Payment Method');
    });
    it('should have payment method list (onchain, offchain)', function () {
        var list = fixture.debugElement.query(platform_browser_1.By.css('section.m-wire--creator-payment-section > ul.m-wire--creator-selector'));
        expect(list).not.toBeNull();
        expect(list.nativeElement.children.length).toBe(3);
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator-selector > li:first-child > .m-wire--creator-selector-type > h5 > span')).nativeElement.textContent).toContain('OnChain');
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator-selector > li:nth-child(2) > .m-wire--creator-selector-type > h5 > span')).nativeElement.textContent).toContain('OffChain');
    });
    it('clicking on a payment option should highlight it', testing_1.fakeAsync(function () {
        comp.setPayloadType('offchain'); // Select other
        fixture.detectChanges();
        testing_1.tick();
        var onchainOption = getPaymentMethodItem(1);
        expect(onchainOption.nativeElement.classList.contains('m-wire--creator-selector--highlight')).toBeFalsy();
        onchainOption.nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        expect(onchainOption.nativeElement.classList.contains('m-wire--creator-selector--highlight')).toBeTruthy();
    }));
    it('should have an amount section', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator--amount'))).not.toBeNull();
    });
    it('amount section should have an input and a label', function () {
        expect(getAmountInput()).not.toBeNull();
        expect(getAmountLabel()).not.toBeNull();
    });
    it("changing amount input should change the wire's amount", function () {
        var amountInput = getAmountInput();
        amountInput.nativeElement.value = '10';
        amountInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(comp.wire.amount).toBe(10);
    });
    it("changing amount input should change the wire's cost", function () {
        var amountInput = getAmountInput();
        amountInput.nativeElement.value = '10';
        amountInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-wire--creator-wide-input--cost-value')).nativeElement.textContent.replace(/[^0-9.,]/g, ''))
            .toBe('100.00');
    });
    it("should have OnChain balance", function () {
        fixture.detectChanges();
        var onchainOption = getPaymentMethodItem(1), subtext = onchainOption.query(platform_browser_1.By.css('.m-wire--creator-selector-subtext')).nativeElement.textContent.trim(), balance = subtext.substr(subtext.lastIndexOf(' ')).trim();
        expect(balance).toBe('500');
    });
    it("should have OffChain balance", function () {
        fixture.detectChanges();
        var onchainOption = getPaymentMethodItem(2), subtext = onchainOption.query(platform_browser_1.By.css('.m-wire--creator-selector-subtext')).nativeElement.textContent.trim(), balance = subtext.substr(subtext.lastIndexOf(' ')).trim();
        expect(balance).toBe('500');
    });
    it("should have credit card payment method", function () {
        fixture.detectChanges();
        var creditCardOption = getPaymentMethodItem(3);
        expect(creditCardOption).not.toBeNull();
    });
    it("recurring checkbox should toggle wire's recurring property", function () {
        comp.setPayloadType('onchain');
        fixture.detectChanges();
        expect(comp.wire.recurring).toBe(false);
        var checkbox = getRecurringCheckbox();
        checkbox.nativeElement.click();
        checkbox.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(checkbox).not.toBeNull();
        expect(comp.wire.recurring).toBe(true);
    });
    it('should show creator rewards', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('m-wire--creator-rewards'))).not.toBeNull();
    });
    it('should have a submit section', function () {
        expect(submitSection).not.toBeNull();
    });
    it('if there are any errors, hovering over the submit section should show them', testing_1.fakeAsync(function () {
        spyOn(comp, 'showErrors').and.callThrough();
        spyOn(comp, 'validate').and.callFake(function () {
            throw new creator_component_1.VisibleWireError('I\'m an error');
        });
        submitSection.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.showErrors).toHaveBeenCalled();
        expect(getErrorLabel().nativeElement.textContent).toContain('I\'m an error');
    }));
    it('should have a send button', function () {
        expect(sendButton).not.toBeNull();
    });
    it('send button should be disabled either if the user hasn\'t entered data, there\'s an error, the component\'s loading something or just saved the wire', function () {
        spyOn(comp, 'canSubmit').and.returnValue(true);
        fixture.detectChanges();
        expect(sendButton.nativeElement.disabled).toBeFalsy();
        comp.criticalError = true;
        fixture.detectChanges();
        expect(sendButton.nativeElement.disabled).toBeTruthy();
        comp.criticalError = false;
        comp.inProgress = true;
        fixture.detectChanges();
        expect(sendButton.nativeElement.disabled).toBeTruthy();
        comp.inProgress = false;
        comp.success = true;
        fixture.detectChanges();
        expect(sendButton.nativeElement.disabled).toBeTruthy();
        comp.success = false;
        comp.canSubmit.and.returnValue(false);
        fixture.detectChanges();
        expect(sendButton.nativeElement.disabled).toBeTruthy();
    });
    it('send button should call submit()', function () {
        spyOn(comp, 'submit').and.callThrough();
        spyOn(comp, 'canSubmit').and.returnValue(true);
        fixture.detectChanges();
        sendButton.nativeElement.click();
        fixture.detectChanges();
        expect(comp.submit).toHaveBeenCalled();
    });
    it('should send a correct onchain wire', testing_1.fakeAsync(function () {
        spyOn(comp, 'submit').and.callThrough();
        spyOn(comp, 'canSubmit').and.returnValue(true);
        var selectTokens = getPaymentMethodItem(1);
        selectTokens.nativeElement.click();
        fixture.detectChanges();
        var amountInput = getAmountInput();
        amountInput.nativeElement.value = '10';
        amountInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        //getRecurringCheckbox().nativeElement.click();
        fixture.detectChanges();
        sendButton.nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        expect(wireServiceMock.submitWire).toHaveBeenCalled();
        expect(wireServiceMock.submitWire.calls.mostRecent().args[0]).toEqual({
            amount: 10,
            guid: null,
            payload: { receiver: '0x1234', address: '' },
            payloadType: "onchain",
            recurring: false
        });
    }));
});
//# sourceMappingURL=creator.component.spec.js.map