"use strict";
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
var testing_1 = require("@angular/core/testing");
var balance_component_1 = require("./balance.component");
var token_pipe_1 = require("../../../../common/pipes/token.pipe");
var tooltip_component_1 = require("../../../../mocks/common/components/tooltip/tooltip.component");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var client_1 = require("../../../../services/api/client");
var web3_wallet_service_1 = require("../../../blockchain/web3-wallet.service");
var token_contract_service_1 = require("../../../blockchain/contracts/token-contract.service");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../../services/session");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
describe('WalletBalanceTokensComponent', function () {
    var comp;
    var fixture;
    function getAddress(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".m-wallet--balance--addresses .m-wallet--balance--addresses-address:nth-child(" + i + ")"));
    }
    function getAddressLabel(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".m-wallet--balance--addresses .m-wallet--balance--addresses-address:nth-child(" + i + ") .m-wallet--balance--addresses-address-label span"));
    }
    function getAddressAddress(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".m-wallet--balance--addresses .m-wallet--balance--addresses-address:nth-child(" + i + ") span.m-wallet--balance--addresses-address-address"));
    }
    function getAddressBalance(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".m-wallet--balance--addresses .m-wallet--balance--addresses-address:nth-child(" + i + ") .m-wallet--balance--addresses-address-col span.m-wallet--balance--addresses-address-balance"));
    }
    var Web3WalletServiceMock = new function () {
        var _this = this;
        this.getCurrentWallet = jasmine.createSpy('getCurrentWallet').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, '0xONCHAIN'];
            });
        }); });
    };
    var TokenContractServiceMock = new function () {
        var _this = this;
        this.balanceOf = jasmine.createSpy('balanceOf').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 30000000];
            });
        }); });
    };
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                token_pipe_1.TokenPipe,
                tooltip_component_1.TooltipComponentMock,
                balance_component_1.WalletBalanceTokensComponent
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: web3_wallet_service_1.Web3WalletService, useValue: Web3WalletServiceMock },
                { provide: token_contract_service_1.TokenContractService, useValue: TokenContractServiceMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(balance_component_1.WalletBalanceTokensComponent);
        comp = fixture.componentInstance; // WalletBalanceTokensComponent test instance
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v2/blockchain/wallet/balance"] = {
            'status': 'success',
            'balance': 301529,
            'addresses': [
                {
                    'label': 'Receiver',
                    'address': '0xreceiver',
                    'balance': 9000000000000000000,
                },
                {
                    'label': 'OffChain',
                    'address': '0xoffchain',
                    'balance': 9000000000000000000,
                }
            ]
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
    it('should have three addresses', function () {
        //expect(getAddress(1)).not.toBeNull();
        expect(getAddress(2)).not.toBeNull();
        expect(getAddress(3)).not.toBeNull();
    });
    it('should have a receiver address', function () {
        expect(getAddressLabel(2).nativeElement.textContent).toContain('Receiver');
        expect(getAddressAddress(2).nativeElement.textContent).toContain('0xreceiver');
        expect(getAddressBalance(2).nativeElement.textContent).toContain('9');
    });
    it('should have an offchain address', function () {
        expect(getAddressLabel(3).nativeElement.textContent).toContain('OffChain');
        expect(getAddressAddress(3).nativeElement.textContent).toContain('0xoffchain');
        expect(getAddressBalance(3).nativeElement.textContent).toContain('9');
    });
    xit('should have an onchainaddress', function () {
        expect(getAddressLabel(1).nativeElement.textContent).toContain('OnChain');
        expect(getAddressAddress(1).nativeElement.textContent).toContain('0x123');
        expect(getAddressBalance(1).nativeElement.textContent).toContain('127');
    });
});
//# sourceMappingURL=balance.component.spec.js.map