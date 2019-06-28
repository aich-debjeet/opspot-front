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
///<reference path="../../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var material_mock_spec_1 = require("../../../../../tests/material-mock.spec");
var payment_methods_component_1 = require("./payment-methods.component");
var web3_wallet_service_1 = require("../../../blockchain/web3-wallet.service");
var client_1 = require("../../../../services/api/client");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var boost_service_1 = require("../../boost.service");
var token_contract_service_1 = require("../../../blockchain/contracts/token-contract.service");
var token_contract_service_mock_spec_1 = require("../../../../../tests/token-contract-service-mock.spec");
var tooltip_component_1 = require("../../../../mocks/common/components/tooltip/tooltip.component");
var address_excerpt_1 = require("../../../../common/pipes/address-excerpt");
var token_pipe_1 = require("../../../../common/pipes/token.pipe");
var local_wallet_service_mock_spec_1 = require("../../../../../tests/local-wallet-service-mock.spec");
var local_wallet_service_1 = require("../../../blockchain/local-wallet.service");
var transaction_overlay_service_mock_spec_1 = require("../../../../../tests/transaction-overlay-service-mock.spec");
var transaction_overlay_service_1 = require("../../../blockchain/transaction-overlay/transaction-overlay.service");
var overlay_modal_1 = require("../../../../services/ux/overlay-modal");
var overlay_modal_service_mock_spec_1 = require("../../../../../tests/overlay-modal-service-mock.spec");
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
var web3WalletServiceMock = new function () {
    var _this = this;
    this.wallets = ['0x123', '0x1234'];
    this.balance = 127000000000000000000;
    this.onChainInterfaceLabel = 'Metamask';
    this.unavailable = false;
    this.locked = false;
    this.isUnavailable = jasmine.createSpy('isUnavailable').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.unavailable];
        });
    }); });
    this.unlock = jasmine.createSpy('unlock').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.locked];
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
describe('BoostCreatorPaymentMethodsComponent', function () {
    var comp;
    var fixture;
    function getPaymentOption(i) {
        return fixture.debugElement.query(platform_browser_1.By.css("ul.m-boost--creator-selector > li:nth-child(" + i + ")"));
    }
    function getPaymentOptionTitle(i) {
        return fixture.debugElement.query(platform_browser_1.By.css("ul.m-boost--creator-selector > li:nth-child(" + i + ") h5 span"));
    }
    function getPaymentOptionBalance(i) {
        return fixture.debugElement.query(platform_browser_1.By.css("ul.m-boost--creator-selector > li:nth-child(" + i + ") span.m-boost--creator-selector--description"));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                tooltip_component_1.TooltipComponentMock,
                address_excerpt_1.AddressExcerptPipe,
                token_pipe_1.TokenPipe,
                payment_methods_component_1.BoostCreatorPaymentMethodsComponent
            ],
            imports: [
                testing_2.RouterTestingModule,
                forms_1.FormsModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                boost_service_1.BoostService,
                { provide: web3_wallet_service_1.Web3WalletService, useValue: web3WalletServiceMock },
                { provide: transaction_overlay_service_1.TransactionOverlayService, useValue: transaction_overlay_service_mock_spec_1.transactionOverlayServiceMock },
                { provide: local_wallet_service_1.LocalWalletService, useValue: local_wallet_service_mock_spec_1.localWalletServiceMock },
                { provide: token_contract_service_1.TokenContractService, useValue: token_contract_service_mock_spec_1.tokenContractServiceMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock }
            ]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(payment_methods_component_1.BoostCreatorPaymentMethodsComponent);
        comp = fixture.componentInstance;
        // Set up mock HTTP client
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v2/blockchain/wallet/balance'] = {
            'status': 'success',
            'addresses': [
                { 'address': '0xonchain', 'balance': 500000000000000000000 },
                { 'address': '0xoffchain', 'balance': 7000000000000000000 } // offchain
            ]
        };
        comp.boost = {
            amount: 1000,
            currency: null,
            type: 'newsfeed',
            // General
            categories: [],
            priority: false,
            // P2P
            target: null,
            postToFacebook: false,
            scheduledTs: null,
            // Payment
            nonce: null
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
    it('should have a list of two payment options', function () {
        expect(getPaymentOption(1)).not.toBeNull();
        expect(getPaymentOption(2)).not.toBeNull();
        //expect(getPaymentOption(3)).not.toBeNull();
    });
    it('should an onchain payment option', function () {
        expect(getPaymentOptionTitle(1).nativeElement.textContent).toContain('OnChain');
    });
    it('clicking on the onchain payment option should set the currency to onchain', function () {
        getPaymentOption(1).nativeElement.click();
        fixture.detectChanges();
        expect(getPaymentOptionTitle(1).nativeElement.textContent).toContain('OnChain');
        expect(comp.boost.currency).toBe('onchain');
    });
    it('clicking on the offchain payment option should set the currency to offchain', function () {
        getPaymentOption(2).nativeElement.click();
        fixture.detectChanges();
        expect(getPaymentOptionTitle(2).nativeElement.textContent).toContain('OffChain');
        expect(comp.boost.currency).toBe('offchain');
    });
    xit('clicking on the creditcard payment option should set the currency to usd', function () {
        getPaymentOption(3).nativeElement.click();
        fixture.detectChanges();
        expect(getPaymentOptionTitle(3).nativeElement.textContent).toContain('Credit Card');
        expect(comp.boost.currency).toBe('usd');
    });
    xit('on p2p, clicking on the creditcard payment option should set the currency to creditcard', function () {
        comp.boost.type = 'p2p';
        fixture.detectChanges();
        getPaymentOption(3).nativeElement.click();
        fixture.detectChanges();
        expect(getPaymentOptionTitle(3).nativeElement.textContent).toContain('Credit Card');
        expect(comp.boost.currency).toBe('creditcard');
    });
    it('both the onchain and the offchain payment option should show the current balance', function () {
        fixture.detectChanges();
        expect(getPaymentOptionBalance(1).nativeElement.textContent).toContain(500);
        expect(getPaymentOptionBalance(2).nativeElement.textContent).toContain(7);
    });
});
//# sourceMappingURL=payment-methods.component.spec.js.map