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
var overview_component_1 = require("./overview.component");
var token_pipe_1 = require("../../../common/pipes/token.pipe");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var client_1 = require("../../../services/api/client");
var of_1 = require("rxjs/internal/observable/of");
var router_1 = require("@angular/router");
var mock_1 = require("../../../utils/mock");
var title_1 = require("../../../services/ux/title");
var session_1 = require("../../../services/session");
var testing_2 = require("@angular/router/testing");
var wallet_1 = require("../../../services/wallet");
var blockchain_service_1 = require("../../blockchain/blockchain.service");
var platform_browser_1 = require("@angular/platform-browser");
var storage_mock_spec_1 = require("../../../../tests/storage-mock.spec");
var storage_1 = require("../../../services/storage");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var routerMock = { navigate: jasmine.createSpy('navigate') };
var WalletServiceMock = new function () {
    var _this = this;
    this.getBalance = jasmine.createSpy('getBalance').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, 2];
        });
    }); });
};
var blockchainService = new function () {
    var _this = this;
    this.getBalance = jasmine.createSpy('getBalance').and.callFake(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, 2];
        });
    }); });
};
describe('WalletOverviewComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                token_pipe_1.TokenPipe,
                mock_1.MockComponent({ selector: 'm-wire-console--overview' }),
                mock_1.MockComponent({ selector: 'm-wallet--balance-usd' }),
                mock_1.MockComponent({ selector: 'm-wallet--balance-rewards' }),
                mock_1.MockComponent({ selector: 'm-wallet--balance-tokens' }),
                overview_component_1.WalletOverviewComponent
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: wallet_1.WalletService, useValue: WalletServiceMock },
                { provide: blockchain_service_1.BlockchainService, useValue: blockchainService },
                { provide: router_1.Router, useValue: testing_2.RouterTestingModule },
                { provide: title_1.OpspotTitle, useValue: mock_1.MockService(title_1.OpspotTitle) },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: storage_1.Storage, useValue: storage_mock_spec_1.storageMock },
                { provide: router_1.ActivatedRoute, useValue: { url: of_1.of([{ path: 'newsfeed' }]), params: of_1.of({ filter: 'trending' }) } }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(overview_component_1.WalletOverviewComponent);
        comp = fixture.componentInstance; // WalletBalanceTokensComponent test instance
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v1/monetization/revenue/overview"] = {
            'status': 'success',
            'balance': 301529,
            total: {
                net: 1
            }
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
    it('should have Wallet', testing_1.fakeAsync(function () {
        testing_1.tick();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-wallet--overview"))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-wallet--overview-balances"))).not.toBeNull();
    }));
});
//# sourceMappingURL=overview.component.spec.js.map