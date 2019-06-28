"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var balance_component_1 = require("./balance.component");
var token_pipe_1 = require("../../../../common/pipes/token.pipe");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var client_1 = require("../../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
describe('WalletBalanceRewardsComponent', function () {
    var comp;
    var fixture;
    function getBalance() {
        return fixture.debugElement.query(platform_browser_1.By.css(".m-wallet--balance"));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                token_pipe_1.TokenPipe,
                balance_component_1.WalletBalanceRewardsComponent
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(balance_component_1.WalletBalanceRewardsComponent);
        comp = fixture.componentInstance; // WalletBalanceTokensComponent test instance
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v2/blockchain/rewards/balance"] = {
            'status': 'success',
            'balance': 301529,
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
    it('should have balance', function () {
        expect(getBalance()).not.toBeNull();
    });
});
//# sourceMappingURL=balance.component.spec.js.map