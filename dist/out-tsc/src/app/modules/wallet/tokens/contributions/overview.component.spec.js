"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var overview_component_1 = require("./overview.component");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var client_1 = require("../../../../services/api/client");
var token_pipe_1 = require("../../../../common/pipes/token.pipe");
var timediff_pipe_1 = require("../../../../common/pipes/timediff.pipe");
var router_1 = require("@angular/router");
var session_1 = require("../../../../services/session");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
describe('WalletTokenContributionsOverviewComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                overview_component_1.WalletTokenContributionsOverviewComponent,
                timediff_pipe_1.TimediffPipe,
                token_pipe_1.TokenPipe
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: core_1.ChangeDetectorRef, useValue: core_1.ChangeDetectorRef },
                { provide: router_1.Router, useValue: testing_2.RouterTestingModule },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(overview_component_1.WalletTokenContributionsOverviewComponent);
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v2/blockchain/contributions/overview"] = {
            "status": "success",
            "nextPayout": 35478,
            "currentReward": "0",
            "yourContribution": 0,
            "totalNetworkContribution": 173525,
            "yourShare": 0
        };
        comp = fixture.componentInstance;
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
    it('should show chart, next payout absent', testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v2/blockchain/contributions/overview"] = {
            "status": "success",
            "currentReward": "0",
            "yourContribution": 0,
            "totalNetworkContribution": 173525,
            "yourShare": 0
        };
        comp = fixture.componentInstance;
        fixture.detectChanges();
        comp.load();
        comp.updateNextPayout();
        fixture.detectChanges();
        expect(comp.overview.nextPayout).toBe(35477);
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token-contributions--overview"))).not.toBeNull();
    }));
    it('should show chart', testing_1.fakeAsync(function () {
        comp.load();
        comp.updateNextPayout();
        fixture.detectChanges();
        expect(comp.overview.nextPayout).toBe(35477);
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token-contributions--overview"))).not.toBeNull();
    }));
    it('should fail', testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.response["api/v2/blockchain/contributions/overview"] = {
            "status": "error",
            "nextPayout": 35478,
            "currentReward": "0",
            "yourContribution": 0,
            "totalNetworkContribution": 173525,
            "yourShare": 0
        };
        comp = fixture.componentInstance;
        fixture.detectChanges();
        comp.load();
        comp.updateNextPayout();
        fixture.detectChanges();
        expect(comp.overview.nextPayout).toBe(35477);
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token-contributions--overview"))).not.toBeNull();
    }));
});
//# sourceMappingURL=overview.component.spec.js.map